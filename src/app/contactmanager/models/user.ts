import { Note } from './note';

export class User {
  id: number;
  birthDate: Date;
  name: String;
  avatar: String;
  bio: String;

  notes: Note[] = [];
}
