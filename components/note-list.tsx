"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Save } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
}

export function NoteList() {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      title: "Physics Chapter 1 Summary",
      content: "Key concepts of motion and forces...",
      createdAt: "2024-07-10",
    },
    {
      id: "2",
      title: "Biology Cell Structure",
      content: "Detailed notes on eukaryotic and prokaryotic cells.",
      createdAt: "2024-07-08",
    },
  ])
  const [newNoteTitle, setNewNoteTitle] = useState("")
  const [newNoteContent, setNewNoteContent] = useState("")
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null)

  const addNote = () => {
    if (newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
      const newNote: Note = {
        id: Date.now().toString(),
        title: newNoteTitle.trim(),
        content: newNoteContent.trim(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setNotes([...notes, newNote])
      setNewNoteTitle("")
      setNewNoteContent("")
    }
  }

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id))
  }

  const startEditing = (note: Note) => {
    setEditingNoteId(note.id)
    setNewNoteTitle(note.title)
    setNewNoteContent(note.content)
  }

  const saveEditedNote = () => {
    if (editingNoteId && newNoteTitle.trim() !== "" && newNoteContent.trim() !== "") {
      setNotes(
        notes.map((note) =>
          note.id === editingNoteId ? { ...note, title: newNoteTitle.trim(), content: newNoteContent.trim() } : note,
        ),
      )
      setEditingNoteId(null)
      setNewNoteTitle("")
      setNewNoteContent("")
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">Your Study Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 mb-6">
          <div className="grid gap-2">
            <Label htmlFor="note-title">Note Title</Label>
            <Input
              id="note-title"
              placeholder="e.g., Photosynthesis Basics"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note-content">Note Content</Label>
            <Textarea
              id="note-content"
              placeholder="Start typing your notes here..."
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={5}
            />
          </div>
          <Button onClick={editingNoteId ? saveEditedNote : addNote} className="w-full bg-primary hover:bg-primary/90">
            {editingNoteId ? (
              <>
                <Save className="h-5 w-5 mr-2" /> Save Changes
              </>
            ) : (
              <>
                <Plus className="h-5 w-5 mr-2" /> Add Note
              </>
            )}
          </Button>
        </div>

        <h3 className="text-lg font-semibold mb-3">All Notes</h3>
        {notes.length === 0 ? (
          <p className="text-center text-muted-foreground">No notes saved yet. Add one above!</p>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {notes.map((note) => (
                <Card key={note.id} className="p-4 border rounded-md shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-lg">{note.title}</h4>
                      <p className="text-sm text-muted-foreground">Created: {note.createdAt}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => startEditing(note)}>
                        Edit
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNote(note.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="sr-only">Delete Note</span>
                      </Button>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm line-clamp-3">{note.content}</p>
                  <Button variant="link" className="p-0 h-auto mt-2">
                    Read More
                  </Button>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>{"Note: Voice recording feature would be integrated here for future enhancements."}</p>
      </CardFooter>
    </Card>
  )
}
