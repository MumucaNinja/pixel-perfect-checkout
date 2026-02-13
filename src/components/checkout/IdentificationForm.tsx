import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React from 'react';

// CPF validation
function isValidCPF(cpf: string): boolean {
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return false;
  if (/^(\d)\1+$/.test(cleaned)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleaned[i]) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleaned[9])) return false;
  
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleaned[i]) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  return remainder === parseInt(cleaned[10]);
}

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(14, 'Telefone inválido'),
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  cpf: z.string().refine((val) => isValidCPF(val), 'CPF inválido'),
});

export type IdentificationFormData = z.infer<typeof formSchema>;

interface IdentificationFormProps {
  onValidChange?: (isValid: boolean, data: IdentificationFormData | null) => void;
}

// Mask functions
function maskPhone(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,2})(\d{0,5})(\d{0,4})$/);
  if (!match) return value;
  
  let result = '';
  if (match[1]) result = `(${match[1]}`;
  if (match[1]?.length === 2) result += ') ';
  if (match[2]) result += match[2];
  if (match[3]) result += `-${match[3]}`;
  return result;
}

function maskCPF(value: string): string {
  const cleaned = value.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,3})(\d{0,2})$/);
  if (!match) return value;
  
  let result = '';
  if (match[1]) result = match[1];
  if (match[2]) result += `.${match[2]}`;
  if (match[3]) result += `.${match[3]}`;
  if (match[4]) result += `-${match[4]}`;
  return result;
}

export function IdentificationForm({ onValidChange }: IdentificationFormProps) {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
  } = useForm<IdentificationFormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      phone: '',
      name: '',
      cpf: '',
    },
  });

  const watchedValues = watch();

  // Notify parent of form data changes
  const allValues = watch();
  
  // Agora o formulário só é válido se o e-mail também estiver correto e preenchido
  const isFormValid = !errors.name && !errors.cpf && !errors.phone && !errors.email && 
                      allValues.name && allValues.cpf && allValues.phone && allValues.email;
  
  // Use effect-like pattern via watch callback
  React.useEffect(() => {
    if (onValidChange) {
      onValidChange(!!isFormValid, isFormValid ? allValues : null);
    }
  }, [allValues.name, allValues.cpf, allValues.phone, allValues.email, isFormValid]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskPhone(e.target.value);
    setValue('phone', masked);
    trigger('phone');
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskCPF(e.target.value);
    setValue('cpf', masked);
    trigger('cpf');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-foreground">Identificação</h2>
      
      <div className="space-y-4">
        {/* Email & Phone Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              className={errors.email ? 'border-destructive' : ''}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              className={errors.phone ? 'border-destructive' : ''}
              value={watchedValues.phone}
              onChange={handlePhoneChange}
            />
            {errors.phone && (
              <p className="text-xs text-destructive">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Name & CPF Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome completo</Label>
            <Input
              id="name"
              type="text"
              placeholder="Seu nome completo"
              className={errors.name ? 'border-destructive' : ''}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              className={errors.cpf ? 'border-destructive' : ''}
              value={watchedValues.cpf}
              onChange={handleCPFChange}
            />
            {errors.cpf && (
              <p className="text-xs text-destructive">{errors.cpf.message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}