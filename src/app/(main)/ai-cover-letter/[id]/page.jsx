import React from 'react'
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function EditCoverLetterPage({ params }){
  const  id  = await params.id;

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href="/ai-cover-letter">
          <Button variant="link" className="gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to Cover Letters
          </Button>
        </Link>
        </div>

        </div>
  )
}

