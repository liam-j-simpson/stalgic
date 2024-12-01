'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from './utils'
import { Button } from './Button'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'
interface DateState {
  date: Date | undefined
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>
}

export function DatePicker({ date, setDate }: DateState) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[240px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'dd/MM/yyyy HH:mm') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
