import * as dotenv from "dotenv";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const CONFIGS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../configs"
);

const envSchema = z.object({
  EMULSIVE_STORE_URL: z.string().url(),
  API_BASE_URL:       z.string().url(),
  USER_EMAIL:         z.string().email(),
  USER_PASSWORD:      z.string().min(1),
  TRACING_ENABLED:    z
                        .string()
                        .transform((v) => v.toLowerCase() === "true")
                        .default("false"),
  ENV_IN_TEST:        z.enum(["dev", "test", "prod"]).default("dev"),
});

type RawConfig = z.infer<typeof envSchema>;

export class TestConfig {
  private constructor(private readonly raw: RawConfig) {}

  get emulsiveStoreUrl(): string  { return this.raw.EMULSIVE_STORE_URL; }
  get apiBaseUrl():       string  { return this.raw.API_BASE_URL; }
  get userEmail():        string  { return this.raw.USER_EMAIL; }
  get userPassword():     string  { return this.raw.USER_PASSWORD; }
  get tracingEnabled():   boolean { return this.raw.TRACING_ENABLED; }
  get envInTest(): "dev" | "test" | "prod" { return this.raw.ENV_IN_TEST; }

  get isProd(): boolean { return this.raw.ENV_IN_TEST === "prod"; }
  get isDev():  boolean { return this.raw.ENV_IN_TEST === "dev"; }
  get isTest(): boolean { return this.raw.ENV_IN_TEST === "test"; }

  static load(source?: Record<string, string | undefined>): TestConfig {
    const merged = source ?? TestConfig.buildSource();
    const parsed = envSchema.safeParse(merged);

    if (!parsed.success) {
      const issues = parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n");
      console.error(`❌ Invalid configuration:\n${issues}`);
      process.exit(1);
    }

    return new TestConfig(parsed.data);
  }

  private static buildSource(): Record<string, string | undefined> {
    const commonEnv = TestConfig.readEnvFile(".env");
    const envInTest = (
      process.env.ENV_IN_TEST ??
      commonEnv.ENV_IN_TEST ??
      "dev"
    ).toLowerCase();

    const envFile = { dev: ".env.dev", test: ".env.test", prod: ".env.prod" }[envInTest];

    if (!envFile) {
      console.error(
        `❌ Invalid ENV_IN_TEST="${envInTest}". Expected one of: dev, test, prod`
      );
      process.exit(1);
    }

    const baseEnv  = TestConfig.readEnvFile(envFile);
    const localEnv = TestConfig.readEnvFile(".env.local");

    return { ...commonEnv, ...baseEnv, ...localEnv, ...process.env };
  }

  private static readEnvFile(fileName: string): Record<string, string> {
    const filePath = path.resolve(CONFIGS_DIR, fileName);
    return fs.existsSync(filePath)
      ? dotenv.parse(fs.readFileSync(filePath))
      : {};
  }
}

export const testConfig = TestConfig.load();
