# Guardian Onboarding - Backend API

API REST construida con **NestJS** para el sistema de onboarding digital de productos financieros.

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalacion

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` en la raiz del proyecto:

```env
JWT_SECRET=guardian-onboarding-secret-key-2024
JWT_EXPIRATION=300
PORT=3001
```

| Variable | Descripcion | Default |
|---|---|---|
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | - |
| `JWT_EXPIRATION` | Tiempo de expiracion del token en segundos | `300` |
| `PORT` | Puerto del servidor | `3001` |

## Scripts

```bash
npm run start:dev    # Desarrollo con hot-reload
npm run build        # Compilar proyecto
npm run start:prod   # Produccion (requiere build previo)
npm run test         # Ejecutar tests
npm run test:watch   # Tests en modo watch
npm run test:cov     # Tests con cobertura
npm run lint         # Linter
```

## Arquitectura

El proyecto sigue una **arquitectura en capas** con inyeccion de dependencias:

```
Controller -> Service -> Repository (Interface)
```

Cada modulo mantiene la siguiente estructura:

```
modulo/
  controllers/     # Endpoints HTTP
  services/        # Logica de negocio
  repositories/    # Acceso a datos (in-memory)
  entities/        # Modelos de dominio
  interfaces/      # Contratos e interfaces
  dtos/            # Validacion de entrada
```

### Estructura del proyecto

```
src/
  common/
    filters/              # HttpExceptionFilter (manejo global de errores)
    interceptors/         # LoggingInterceptor, TransformInterceptor
    interfaces/           # IRepository<T> (contrato generico)
  auth/
    controllers/          # POST /auth/login
    services/             # Validacion de credenciales + generacion JWT
    repositories/         # InMemoryUserRepository
    entities/             # User
    interfaces/           # IUserRepository, IAuthService, JwtPayload
    guards/               # JwtAuthGuard
    strategies/           # JwtStrategy (Passport)
    dtos/                 # LoginDto
  products/
    controllers/          # GET /products, GET /products/:id
    services/             # Logica de productos + caching
    repositories/         # InMemoryProductRepository
    entities/             # Product
    interfaces/           # IProductRepository
  onboarding/
    controllers/          # POST /onboarding (protegido con JWT)
    services/             # Logica de onboarding + validacion duplicados
    repositories/         # InMemoryOnboardingRepository
    entities/             # Onboarding, OnboardingStatus
    interfaces/           # IOnboardingRepository, OnboardingResponse
    dtos/                 # CreateOnboardingDto
  health/
    controllers/          # GET /health
    services/             # HealthService
    interfaces/           # IHealthService, HealthResponse
```

## Documentacion Swagger

Con el servidor en ejecucion, la documentacion interactiva esta disponible en:

```
http://localhost:3001/api/docs
```

Desde ahi se pueden explorar y probar todos los endpoints, incluyendo autenticacion JWT.

## API Endpoints

### Health

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| `GET` | `/health` | Estado del servicio | No |

### Auth

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| `POST` | `/auth/login` | Autenticacion y obtencion de token JWT | No |

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresIn": 300
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Products

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| `GET` | `/products` | Listar productos activos | No |
| `GET` | `/products/:id` | Obtener producto por ID | No |

### Onboarding

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| `POST` | `/onboarding` | Crear solicitud de onboarding | JWT |

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Juan Perez",
  "document": "1234567890",
  "email": "juan@email.com",
  "initialAmount": 500000
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "onboardingId": "uuid-generado",
    "status": "REQUESTED"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Patrones implementados

- **Repository Pattern** con inyeccion por Symbol token (`@Inject(SYMBOL)`)
- **Interface-based DI** - Los services dependen de interfaces, no de implementaciones concretas
- **Global Exception Filter** - Respuestas de error estandarizadas
- **Transform Interceptor** - Formato de respuesta uniforme (`{ success, data, timestamp }`)
- **Logging Interceptor** - Log automatico de cada request con tiempo de respuesta
- **ValidationPipe** - Validacion automatica de DTOs con `class-validator`
- **Cache Layer** - Caching in-memory para productos (TTL: 60s, max: 100 entradas)
- **JWT Authentication** - Passport + JWT Strategy con guards reutilizables
- **Swagger/OpenAPI** - Documentacion interactiva en `/api/docs`

## Almacenamiento

Actualmente el proyecto usa **almacenamiento in-memory** (Maps y Arrays). Los datos se pierden al reiniciar el servidor. Esto es intencional para la fase de prototipo.

Para produccion se recomienda reemplazar los repositorios in-memory por implementaciones con base de datos (PostgreSQL + TypeORM/Prisma), manteniendo las mismas interfaces.

## Docker

```bash
docker build -t guardian-backend .
docker run -p 3001:3001 \
  -e JWT_SECRET=guardian-onboarding-secret-key-2024 \
  -e JWT_EXPIRATION=300 \
  -e PORT=3001 \
  guardian-backend
```

O con docker-compose desde la raiz del proyecto:

```bash
docker compose up
```

## Tests

```bash
npm run test
```

Los tests unitarios cubren la capa de servicios con mocks de repositorios y dependencias externas.
