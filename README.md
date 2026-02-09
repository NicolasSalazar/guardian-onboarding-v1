# Guardian Onboarding

Sistema de onboarding digital para productos financieros. Permite la autenticacion de usuarios, consulta de productos bancarios y registro de solicitudes de apertura de cuenta.

## Arquitectura

El proyecto esta compuesto por dos aplicaciones independientes:

```
guardian-onboarding/
  backend/       # API REST (NestJS 10, TypeScript)
  frontend/      # Aplicacion web (Next.js 14, React 18)
```

### Backend

API REST con arquitectura en capas (Controller → Service → Repository) e inyeccion de dependencias basada en interfaces. Incluye autenticacion JWT, validacion con class-validator, cache en memoria y documentacion Swagger.

### Frontend

Aplicacion SPA con separacion por responsabilidad: cada modulo tiene su vista (page.tsx), hook (useX.ts), estilos (x.styles.ts), tipos (x.types.ts) y constantes (x.constants.ts).

## Endpoints

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| `GET` | `/health` | Estado del servicio | No |
| `POST` | `/auth/login` | Autenticacion JWT | No |
| `GET` | `/products` | Listar productos financieros | No |
| `GET` | `/products/:id` | Obtener producto por ID | No |
| `POST` | `/onboarding` | Crear solicitud de onboarding | JWT |

## Inicio rapido

### Opcion 1: Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

### Opcion 2: Ejecucion local

**Requisitos:** Node.js >= 18, npm >= 9

```bash
# Backend
cd backend
npm install
cp .env.example .env  # o crear .env con las variables
npm run start:dev

# Frontend (en otra terminal)
cd frontend
npm install
npm run dev
```

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Swagger: http://localhost:3001/api/docs

## Variables de entorno

### Backend

| Variable | Descripcion | Default |
|---|---|---|
| `JWT_SECRET` | Clave secreta para firmar tokens JWT | - |
| `JWT_EXPIRATION` | Tiempo de expiracion del token (segundos) | `300` |
| `PORT` | Puerto del servidor | `3001` |

### Frontend

| Variable | Descripcion | Default |
|---|---|---|
| `BACKEND_URL` | URL del backend API | `http://localhost:3001` |

## Credenciales de prueba

```
Usuario: admin
Password: admin123
```

## Stack tecnologico

### Backend
- **NestJS** 10 con TypeScript
- **Passport + JWT** para autenticacion
- **class-validator** para validacion de DTOs
- **cache-manager** para cache en memoria
- **Swagger/OpenAPI** para documentacion
- Almacenamiento in-memory (sin base de datos)

### Frontend
- **Next.js** 14.2 (App Router)
- **React** 18.3 con TypeScript
- CSS-in-JS con objetos de estilo inline

## Patrones de diseno

- **Repository Pattern** con inyeccion por Symbol token
- **Interface-based DI** (servicios dependen de contratos, no de implementaciones)
- **Cache-aside** en capa de servicio para productos
- **Global Exception Filter** con respuestas estandarizadas
- **Transform Interceptor** con formato uniforme `{ success, data, timestamp }`
- **Custom Hooks** para separacion de logica y vista en el frontend

## Tests

```bash
cd backend
npm run test
```

12 tests unitarios cubriendo la capa de servicios con mocks de repositorios y dependencias.

## Documentacion detallada

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)
