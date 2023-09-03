import mongoose from 'mongoose';

export default function (): void {
  //   const db = `${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  const uri = process.env.MONGO_URI as string;
  mongoose.connect(uri).then(() => console.log('Connected to db!'));
}
