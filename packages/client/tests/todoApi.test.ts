import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  fetchTodos,
  createTodo,
  toggleTodoStatus,
  removeTodo
} from '../src/api/todos';

const API_URL = 'http://localhost:3001/api/todos';

beforeEach(() => {
  vi.resetAllMocks();
  globalThis.fetch = vi.fn();
});

describe('Todo API', () => {
  
  it('fetchTodos() doit récupérer la liste des todos', async () => {
    const mockTodos = [
      { id: '1', text: 'Test', completed: false, createdAt: '2024-01-01' }
    ];

    (globalThis.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockTodos)
    });

    const result = await fetchTodos();

    expect(globalThis.fetch).toHaveBeenCalledWith(API_URL);
    expect(result).toEqual(mockTodos);
  });

  it('createTodo() doit créer un todo', async () => {
    const mockTodo = { id: '1', text: 'Nouveau', completed: false, createdAt: '2024-01-01' };

    (globalThis.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockTodo)
    });

    const text = 'Nouveau';
    const result = await createTodo(text);

    expect(globalThis.fetch).toHaveBeenCalledWith(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });

    expect(result).toEqual(mockTodo);
  });

  it('toggleTodoStatus() doit mettre à jour un todo', async () => {
    const updated = { id: '1', text: 'Test', completed: true, createdAt: '2024-01-01' };

    (globalThis.fetch as any).mockResolvedValue({
      json: vi.fn().mockResolvedValue(updated)
    });

    const result = await toggleTodoStatus('1');

    expect(globalThis.fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
      method: 'PATCH'
    });

    expect(result).toEqual(updated);
  });

  it('removeTodo() doit appeler DELETE sans retourner de valeur', async () => {
    (globalThis.fetch as any).mockResolvedValue({});

    await removeTodo('1');

    expect(globalThis.fetch).toHaveBeenCalledWith(`${API_URL}/1`, {
      method: 'DELETE'
    });
  });

});
