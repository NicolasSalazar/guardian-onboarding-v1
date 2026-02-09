'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { onboardingService } from '@/services/api';
import { OnboardingForm, OnboardingResponse } from './onboarding.types';
import { INITIAL_FORM } from './onboarding.constants';

export function useOnboarding() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<OnboardingForm>(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<OnboardingResponse | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await onboardingService.create({
        name: form.name,
        document: form.document,
        email: form.email,
        initialAmount: Number(form.initialAmount),
      });
      setSuccess(response.data);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el onboarding');
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    loading,
    error,
    success,
    isAuthenticated,
    handleChange,
    handleSubmit,
  };
}
