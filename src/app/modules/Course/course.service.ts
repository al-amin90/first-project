import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './course.constant'
import { TCourse } from './course.interface'
import { Course } from './course.model'

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload)
  return result
}

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await courseQuery.modelQuery
  return result
}

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...remainingData } = payload

  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    remainingData,
    {
      new: true,
      runValidators: true,
    },
  )

  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    const deletedPreRequisite = preRequisiteCourses
      .filter(el => el.course && el.isDeleted)
      .map(el => el.course)

    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
      id,
      {
        $pull: {
          preRequisiteCourses: { course: { $in: deletedPreRequisite } },
        },
      },
      { new: true, runValidators: true },
    )

    const addPreRequisite = preRequisiteCourses.filter(
      el =>
        el.course &&
        mongoose.Types.ObjectId.isValid(el.course) &&
        !el.isDeleted,
    )

    const addPreRequisiteCourse = await Course.findByIdAndUpdate(
      id,
      { $addToSet: { preRequisiteCourses: { $each: addPreRequisite } } },
      { new: true, runValidators: true },
    )
  }

  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  )

  return result
}

const getSingleCourseFromDB = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const deleteCourseIntoDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  )
  return result
}

export const CourseServices = {
  createCourseIntoDB,
  getAllCourseFromDB,
  getSingleCourseFromDB,
  deleteCourseIntoDB,
  updateCourseIntoDB,
}
