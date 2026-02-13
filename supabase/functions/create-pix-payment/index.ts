import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { amount, debtor_name, email, debtor_document_number, phone } = await req.json();

    // Validate required fields
    if (!amount || !debtor_name || !debtor_document_number || !phone) {
      return new Response(
        JSON.stringify({ error: 'Campos obrigatórios faltando' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = Deno.env.get('PAYMENT_GATEWAY_TOKEN');
    const secret = Deno.env.get('PAYMENT_GATEWAY_SECRET');

    if (!token || !secret) {
      return new Response(
        JSON.stringify({ error: 'Gateway não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean document number (remove mask)
    const cleanDoc = debtor_document_number.replace(/\D/g, '');
    const cleanPhone = phone.replace(/\D/g, '');

    const gatewayResponse = await fetch('https://painel.xbankaccess.com/api/wallet/deposit/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        secret,
        amount: Number(amount),
        debtor_name,
        email: email || '',
        debtor_document_number: cleanDoc,
        phone: cleanPhone,
        method_pay: 'pix',
        postback: `${Deno.env.get('SUPABASE_URL')}/functions/v1/pix-webhook`,
      }),
    });

    const data = await gatewayResponse.json();

    if (!gatewayResponse.ok) {
      return new Response(
        JSON.stringify({ error: data.error || 'Erro ao gerar PIX', details: data }),
        { status: gatewayResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        idTransaction: data.idTransaction,
        qrcode: data.qrcode,
        qr_code_image_url: data.qr_code_image_url,
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Erro interno do servidor' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
