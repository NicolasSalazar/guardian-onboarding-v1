# Guardian Onboarding - Frontend

Aplicacion web construida con **Next.js 14** y **React 18** para el sistema de onboarding digital de productos financieros.

## Requisitos

- Node.js >= 18
- npm >= 9
- Backend corriendo en `http://localhost:3001`

## Instalacion

```bash
npm install
```

## Scripts

```bash
npm run dev      # Desarrollo con hot-reload (puerto 3000)
npm run build    # Compilar para produccion
npm run start    # Iniciar en modo produccion
npm run lint     # Linter
```

## Arquitectura

Cada modulo sigue una **separacion por responsabilidad**:

```
modulo/
  page.tsx              # Vista (solo JSX, sin logica)
  useModulo.ts          # Hook (logica, estado, efectos)
  modulo.styles.ts      # Estilos (objetos CSS-in-JS)
  modulo.types.ts       # Interfaces y tipos del modulo
  modulo.constants.ts   # Constantes del modulo (si aplica)
```

### Estructura del proyecto

```
src/
  app/
    layout.tsx                    # Layout raiz (AuthProvider + Navbar)
    page.tsx                      # Home - vista
    styles/
      home.styles.ts              # Home - estilos
      layout.styles.ts            # Layout raiz - estilos
    login/
      page.tsx                    # Login - vista
      useLogin.ts                 # Login - hook (auth + navegacion)
      login.styles.ts             # Login - estilos
      login.types.ts              # Login - interfaces (LoginRequest, LoginResponse)
    onboarding/
      page.tsx                    # Onboarding - vista
      useOnboarding.ts            # Onboarding - hook (formulario + API)
      onboarding.styles.ts        # Onboarding - estilos
      onboarding.types.ts         # Onboarding - interfaces (Request, Response, Form)
      onboarding.constants.ts     # Onboarding - constantes (INITIAL_FORM)
    products/
      page.tsx                    # Products - vista
      useProducts.ts              # Products - hook (fetch + estado)
      products.styles.ts          # Products - estilos
      products.types.ts           # Products - interfaces (Product)
      products.constants.ts       # Products - constantes (TYPE_LABELS)
  components/
    Navbar.tsx                    # Navegacion principal
    navbar.styles.ts              # Navbar - estilos
  context/
    AuthContext.tsx                # Contexto de autenticacion JWT
  helpers/
    format.ts                     # Utilidades genericas (formatCurrency)
  services/
    api.ts                        # Cliente HTTP (fetch wrapper)
  types/
    index.ts                      # Interfaces genericas (ApiResponse)
```

## Paginas

| Ruta | Descripcion | Auth requerida |
|---|---|---|
| `/` | Home con informacion del proyecto | No |
| `/login` | Formulario de inicio de sesion | No |
| `/products` | Catalogo de productos financieros | No |
| `/onboarding` | Formulario de solicitud de onboarding | Si |

## Manejo de errores

- **Capa de servicio** (`api.ts`): El wrapper `request()` captura errores HTTP y los convierte en excepciones con mensajes descriptivos.
- **Hooks**: Cada hook captura errores de las llamadas API y los expone como estado (`error`).
- **Vistas**: Los componentes renderizan los errores en bloques visuales estilizados.
- **AuthContext**: Maneja errores de login y los propaga al hook `useLogin`.

## Conexion con el backend

Las peticiones se hacen a `/api/*` y Next.js las redirige al backend via rewrites configurados en `next.config.js`:

```javascript
// /api/:path* -> http://localhost:3001/:path*
```

## Autenticacion

- El token JWT se almacena en `localStorage`
- Se incluye automaticamente en cada request via el header `Authorization: Bearer <token>`
- El `AuthContext` expone: `token`, `isAuthenticated`, `login()`, `logout()`, `error`, `loading`
- Las rutas protegidas redirigen a `/login` si no hay sesion activa

## Stack tecnologico

- **Next.js** 14.2 (App Router)
- **React** 18.3
- **TypeScript** 5.5
- CSS-in-JS con objetos de estilo inline
