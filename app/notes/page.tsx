import { NoteList } from "@/components/note-list"

export default function NotesPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-start justify-center bg-gradient-to-br from-white to-blue-50 p-4 md:p-8">
      <NoteList />
    </div>
  )
}
