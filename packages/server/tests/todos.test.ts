import {vi, describe, expect, it, beforeEach, Mocked} from 'vitest'
import {addTodo, deleteTodo, getAllTodos, toggleTodo} from '../src/todos'
import { readTodos, writeTodos } from '../src/storage'

vi.mock("../src/storage", () => ({
  readTodos: vi.fn(),
  writeTodos: vi.fn()
}))

//const mockedFs = fs as Mocked<typeof fs>

describe("Test on todos handler", () => {
  beforeEach( () => {
    vi.clearAllMocks()
  })

  const todos = [
    {
      "id": "1762079488876",
      "text": "bonsoir",
      "completed": false,
      "createdAt": "2025-11-02T10:31:28.876Z"
    }
  ]

  it("list all the todos from the todos list file", async () => {

    
    vi.mocked(readTodos).mockResolvedValue(todos);
    const result = await getAllTodos();

    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBe(1)
  })

  it('add a todo to the todos list file', async () => {
    // Given
    vi.mocked(readTodos).mockResolvedValue([]);
    const text = "Todo test"

    // When
    const result = await addTodo(text)

    // Then
    expect(typeof result).toEqual("object")
    expect(result.text).toEqual(text)

    expect(vi.mocked(writeTodos)).toHaveBeenCalledTimes(1)
    const writtenData = vi.mocked(writeTodos).mock.calls[0][0] as any[];


    expect(writtenData).toHaveLength(1);
    expect(writtenData[0].text).toBe(text);
  })

  it('toggle an existing todo', async () => {
    // Given
    vi.mocked(readTodos).mockResolvedValue(todos);
    const id = "1762079488876"

    // When
    const result = await toggleTodo(id)

    // Then
    expect(typeof result).toEqual("object")
    expect(result!.completed).toEqual(true)

    expect(vi.mocked(writeTodos)).toHaveBeenCalledTimes(1)
    const writtenData = vi.mocked(writeTodos).mock.calls[0][0] as any[];


    expect(writtenData).toHaveLength(1);
    expect(writtenData[0].completed).toBe(true);
  })

  it('toggle an non-existing todo', async () => {
    // Given
    vi.mocked(readTodos).mockResolvedValue(todos);
    const id = "32"

    // When
    const result = await toggleTodo(id)

    // Then
    expect(typeof result).toEqual("undefined")

    expect(vi.mocked(writeTodos)).toHaveBeenCalledTimes(0)
  })


  it('delete an existing todo', async () => {
    // Given
    vi.mocked(readTodos).mockResolvedValue(todos);
    const id = "1762079488876"

    // When
    const result = await deleteTodo(id)

    // Then
    expect(typeof result).toEqual("object")
    expect(result!.success).toEqual(true)

    expect(vi.mocked(writeTodos)).toHaveBeenCalledTimes(1)
    const writtenData = vi.mocked(writeTodos).mock.calls[0][0] as any[];


    expect(writtenData).toHaveLength(0);
  })

})