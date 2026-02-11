# AGENTS

This file captures project conventions and workflows for humans and AI agents.

## Repo layout
- `services/server`: NestJS API with MikroORM.
- `services/scraper`: NestJS API with MikroORM.
- `services/client`: React/MUI frontend.
- `packages/*`: shared libraries (constants, types, form).

## Tooling
- Node.js >= 22 (`.nvmrc`).
- npm workspaces from repo root.

## Formatting and linting
- Prettier settings: double quotes, `printWidth` 120, `trailingComma` all, `arrowParens` avoid.
- Lint staged files with Prettier then ESLint (`.lintstagedrc`).
- ESLint config extends `@ethberry/eslint-config` and should not be customized in `eslint.config.mjs`.

## Naming conventions
- Variables holding DB entities use the `Entity` suffix (e.g., `merchantEntity`).
- Variables holding DB repositories use the `EntityRepository` suffix (e.g., `merchantEntityRepository`).

## Typescript style
- Keep imports grouped by external packages then internal modules.

## React style
- Follow existing formatting: 2-space indentation, semicolons, double quotes.
- Keep imports grouped by external packages then internal modules.
- Function components only.
- Props interfaces use `I<ComponentName>Props`.
- Components export prop types.
- MUI styled API is common; styled components live in `styled.ts` next to the component.
- React props should be passed as a single variable, then spread on the first line inside the function.
    - Example (props): `export const Button = (props: ButtonProps) => { const { text, isLoading } = props; ... }`

## NestJS modules
- Modules typically include `*.module.ts`, `*.service.ts`, `*.controller.ts`, and `*.entity.ts` files (see `services/server/src/marketplace/escort`).
- Services are the single point for actions on a model and are used by controllers.
- Inject repositories with `@InjectRepository(Entity)` in services.
- Always add `Logger` to new modules, even if the module is empty.
- Inject `Logger` via constructor with `@Inject(Logger) private readonly loggerService: LoggerService` (do not use `new Logger()`). Pass the class name as context: `this.loggerService.log("message", MyService.name)`.
- Do not store config values (e.g., API keys) as class properties. Call `configService.get()` each time inside the method that needs it.
- Each interface must be in its own file. Use a barrel `index.ts` to re-export them. Unless it is used in several places an extracted to @framework/type package
- DTO should be passed as a single variable, then spread on the first line inside the function.
    - Example (DTO): `create(dto: CreateAssetDto) { const { title, description } = dto; ... }`

## Build and development
- When changing anything under `packages/`, run that package's build so services consume updates.
  - Example: `cd packages/types && npm run build`
- Root build command: `npm run build` (builds shared packages).

## Tests
- Backend tests use Jest with `*.spec.ts` (see `services/server`).
- Tests use a real database connection (no mocking)
- Tests that create data must clean up after themselves (delete all records in `afterAll`).
- Seeding in tests uses seed module/service; this is an exception to the single service point rule for model actions.
- Seed module/service naming convention: `{Entity}SeedModule` / `{Entity}SeedService` (e.g., `UserSeedModule`, `UserSeedService`).
- Seed module/service should be placed in the same folder as the tests that use them.
- Run server tests: `npm run --prefix ./services/server test`

