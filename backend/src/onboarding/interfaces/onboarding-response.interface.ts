import { ApiProperty } from '@nestjs/swagger';

export class OnboardingResponse {
  @ApiProperty({
    description: 'ID unico de la solicitud de onboarding',
    example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  })
  onboardingId: string;

  @ApiProperty({
    description: 'Estado de la solicitud',
    example: 'REQUESTED',
    enum: ['REQUESTED', 'IN_REVIEW', 'APPROVED', 'REJECTED'],
  })
  status: string;
}
