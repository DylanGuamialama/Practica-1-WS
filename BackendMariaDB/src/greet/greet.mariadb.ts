import { createConnection, Connection, ConnectionConfig } from 'mariadb'
import dotenv from 'dotenv'

dotenv.config()

const dbConfig: ConnectionConfig = {
  host: process.env.DB_HOST!,
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME!,
  connectTimeout: 10000 // 10 segundos
}

let connection: Connection

async function connectToDatabase(): Promise<void> {
  try {
    connection = await createConnection(dbConfig)
    console.log('Conexión a la base de datos establecida')
  } catch (error) {
    console.error('Error conectando a la base de datos:', error)
  }
}

connectToDatabase()

export type Param = {
  greet: string
  language: string
}

export type StatsResult = {
  total: number
  byLanguage: { language: string; count: number }[]
}

export class Greet {
  static async findAll() {
    return await connection.query('SELECT id, greet, language FROM regards')
  }

  static async findById(id: number) {
    const rows = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    )
    return rows[0] || null
  }

  static async create(param: Param) {
    const [{ id }] = await connection.query(
      'INSERT INTO regards (greet, language) VALUES (?, ?) RETURNING id',
      [param.greet, param.language]
    ) as any
    const [created] = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    ) as any
    return created
  }

  static async update(id: number, param: Param) {
    const res = await connection.query(
      'UPDATE regards SET greet = ?, language = ? WHERE id = ?',
      [param.greet, param.language, id]
    ) as any
    if (res.affectedRows === 0) return null
    const [updated] = await connection.query(
      'SELECT id, greet, language FROM regards WHERE id = ?',
      [id]
    ) as any
    return updated
  }

  static async remove(id: number) {
    const res = await connection.query(
      'DELETE FROM regards WHERE id = ?',
      [id]
    ) as any
    return res.affectedRows > 0
  }

  static async stats(): Promise<StatsResult> {
  const rows = await connection.query(
    'SELECT language, COUNT(*) AS count FROM regards GROUP BY language'
  ) as any[]

  const total = rows.reduce((sum, r) => sum + Number(r.count), 0)

  return {
    total,
    byLanguage: rows.map(r => ({
      language: r.language,
      count: Number(r.count)
    }))
  }
}
}