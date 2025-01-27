import mysql from 'mysql2/promise';

export const connect = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    database: process.env.DB_DATABASE!,
    port: parseInt(process.env.DB_PORT!),
    password: process.env.DB_PASSWORD || '',
  });
  return connection;
};

export async function query(query: string): Promise<any> {
  try {
    const connection = await connect();
    const queryRes = await connection.query(query);
    if (queryRes.length > 0) {
      return queryRes[0];
    }
    return null;
  } catch (error) {
    console.log('Unable to run query');
    console.log({ error });

    return null;
  }
}
