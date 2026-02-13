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
    const supabaseUrl = Deno.env.get('SUPABASE_URL');

    if (!token || !secret) {
      console.error("ERRO: Token ou Secret ausentes nas variáveis de ambiente.");
      return new Response(
        JSON.stringify({ error: 'Gateway não configurado' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Clean document number and phone (remove mask)
    const cleanDoc = String(debtor_document_number).replace(/\D/g, '');
    const cleanPhone = String(phone).replace(/\D/g, '');

    // 🔴 A CORREÇÃO DE OURO ESTÁ AQUI: Arredonda para 2 casas decimais cravadas
    const valorCorrigido = Number(Number(amount).toFixed(2));

    const payload = {
        token,
        secret,
        amount: valorCorrigido,
        debtor_name,
        email: email || '',
        debtor_document_number: cleanDoc,
        phone: cleanPhone,
        method_pay: 'pix',
        postback: `${supabaseUrl}/functions/v1/pix-webhook`,
    };

    // Log para você ver no painel do Supabase se os dados estão sendo montados certos
    console.log("Enviando Payload para XBankAccess:", payload);

    const gatewayResponse = await fetch('https://painel.xbankaccess.com/api/wallet/deposit/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    // CORREÇÃO PRINCIPAL: Ler como texto primeiro para evitar "crash" se a API não devolver JSON
    const responseText = await gatewayResponse.text();
    console.log("Resposta bruta da API:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("A API do XBank não retornou um JSON válido. Retornou:", responseText);
      throw new Error(`Resposta inválida da API: Status ${gatewayResponse.status}`);
    }

    if (!gatewayResponse.ok) {
      console.error("A API recusou a requisição. Detalhes:", data);
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
    console.error("🔥 ERRO FATAL NA EDGE FUNCTION:", error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : "Erro desconhecido" 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});