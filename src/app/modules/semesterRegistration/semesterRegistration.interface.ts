export type TSemesterRegistration = {
  name: 'Autumn' | 'Summer' | 'Fall'
  year: string
  code: '01' | '02' | '03'
  startMonth: TMonths
  endMonth: TMonths
}

export type TAcademicSemesterNameCodeMapped = {
  [key: string]: string
}
