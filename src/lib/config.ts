import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'smol-toml';
interface Config {
 site: { title: string; description: string };
 author: { name: string; title: string };
 social: { email: string; github: string; google_scholar?: string };
}
export function getConfig(): Config {
 return parse(fs.readFileSync(path.join(process.cwd(), 'content/config.toml'), 'utf8')) as unknown as Config;
}
