import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import dotenv from 'dotenv';
import * as schema from '../migrations/schema';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

dotenv.config({ path: '.env' });

if (!process.env.DATABASE_URL) {
    throw new Error('Missing DATABASE_URL');
}

const clientOptions = {
    max: 1,
    idle_timeout: 30,
    connect_timeout: 30,
    prepare: false
};
const client = postgres(process.env.DATABASE_URL, clientOptions);

// Initialiser Drizzle avec le schéma défini
const db = drizzle(client, { schema });

// Fonction asynchrone pour exécuter les migrations
const migrateDb = async () => {
    try {
        console.log('🟠 Migrating database...');
        await migrate(db, { migrationsFolder: 'migrations' });
        console.log('✅ Database migrated successfully');
    } catch (err) {
        console.error('🔴 Error migrating database:', err.message);
    }
};

// Exécuter la migration
migrateDb();

export default db;
