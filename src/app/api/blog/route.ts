import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';

export async function GET(): Promise<NextResponse> {
  const file = await fs.readFile(process.cwd() + '/posts/hello-world.md', 'utf8');
  return NextResponse.json({ content: file });
}
