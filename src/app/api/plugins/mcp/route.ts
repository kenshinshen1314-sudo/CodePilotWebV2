import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';
import type { MCPServerConfig, ErrorResponse } from '@/types';

function getConfigPath(): string {
  return path.join(os.homedir(), '.claude', 'config.json');
}

function readConfig(): Record<string, unknown> {
  const configPath = getConfigPath();
  if (!fs.existsSync(configPath)) return {};
  try {
    return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  } catch {
    return {};
  }
}

function writeConfig(config: Record<string, unknown>): void {
  const configPath = getConfigPath();
  const dir = path.dirname(configPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
}

export async function GET(): Promise<NextResponse> {
  try {
    const config = readConfig();
    const mcpServers = (config.mcpServers || {}) as Record<string, MCPServerConfig>;
    return NextResponse.json({ mcpServers });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to load MCP servers' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { name, server } = body;

    if (!name || !server) {
      return NextResponse.json(
        { error: 'Name and server are required' },
        { status: 400 }
      );
    }

    const config = readConfig();
    const mcpServers = (config.mcpServers || {}) as Record<string, MCPServerConfig>;

    if (mcpServers[name]) {
      return NextResponse.json(
        { error: `MCP server "${name}" already exists` },
        { status: 400 }
      );
    }

    mcpServers[name] = server;
    config.mcpServers = mcpServers;
    writeConfig(config);

    return NextResponse.json({ mcpServers });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add MCP server' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { mcpServers } = body;

    if (!mcpServers || typeof mcpServers !== 'object') {
      return NextResponse.json(
        { error: 'mcpServers object is required' },
        { status: 400 }
      );
    }

    const config = readConfig();
    config.mcpServers = mcpServers;
    writeConfig(config);

    return NextResponse.json({ mcpServers });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update MCP servers' },
      { status: 500 }
    );
  }
}
