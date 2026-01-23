"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Calendar, Clock, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { RegisterButton } from "@/components/register-button"
import { BYTETEK_PROGRAMS, CLASS_INFO, PROGRAM_INFO } from "@/lib/programs-data"

export function ProgramsSection() {
  const [activeProgramIndex, setActiveProgramIndex] = useState(0)
  const [activeCourseIndex, setActiveCourseIndex] = useState(0)

  const activeProgram = BYTETEK_PROGRAMS[activeProgramIndex]
  const activeCourse = activeProgram.courses[activeCourseIndex]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const discountedPrice = Math.round(activeCourse.price * (1 - PROGRAM_INFO.discount.percentage / 100))

  return (
    <section id="programs" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Choose Your Tech Path</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            {PROGRAM_INFO.duration} • {PROGRAM_INFO.format}
          </p>
        </div>

        {/* Program Selection & Details */}
        <div className="max-w-6xl mx-auto mb-16">
          {/* Program Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {BYTETEK_PROGRAMS.map((program, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveProgramIndex(index)
                  setActiveCourseIndex(0)
                }}
                className={cn(
                  "p-4 rounded-lg transition-all duration-300 text-left border-2",
                  activeProgramIndex === index
                    ? "bg-gray-800 text-white border-gray-600"
                    : "bg-gray-900 text-white border-gray-700 hover:border-gray-600",
                )}
              >
                <div className="font-bold text-lg">{program.category}</div>
                <div className="text-sm opacity-75 mt-1">{program.ageGroup}</div>
                <div className="text-xs opacity-60 mt-2 flex items-center gap-2">
                  {program.courses.length} courses
                  {activeProgramIndex === index && <ChevronRight className="w-4 h-4" />}
                </div>
              </button>
            ))}
          </div>

          {/* Program Description */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 mb-8">
            <p className="text-gray-300 text-lg">{activeProgram.description}</p>
          </div>

          {/* Courses Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Available Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeProgram.courses.map((course, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCourseIndex(index)}
                  className={cn(
                    "p-4 rounded-lg border-2 transition-all duration-300 text-left",
                    activeCourseIndex === index
                      ? "bg-gray-800 text-white border-gray-600"
                      : "bg-gray-900 text-white border-gray-700 hover:border-gray-600",
                  )}
                >
                  <div className="font-semibold">{course.name}</div>
                  <div className="text-sm opacity-75 mt-2">{formatPrice(course.price)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Course Details */}
          <div className="bg-gray-800 border border-gray-700 text-white rounded-lg p-8">
            <h4 className="text-2xl font-bold mb-2">{activeCourse.name}</h4>
            <p className="text-gray-300 mb-6">{activeCourse.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-600">
              <div>
                <div className="text-sm text-gray-400">Regular Price</div>
                <div className="text-3xl font-bold">{formatPrice(activeCourse.price)}</div>
              </div>
              <div>
                <div className="text-sm text-gray-400">Early Bird (30% OFF)</div>
                <div className="text-3xl font-bold text-green-400">{formatPrice(discountedPrice)}</div>
              </div>
            </div>

            <RegisterButton
              className="w-full py-3 font-semibold bg-white text-black hover:bg-gray-200"
            >
              Enroll Now
            </RegisterButton>
          </div>
        </div>

        {/* Class Schedule & Location */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 border-t border-gray-700 pt-16">
          {/* Physical Classes */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6" />
              Physical Classes
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-4 text-sm">Schedule</h4>
                <div className="space-y-2">
                  {CLASS_INFO.physical.days.map((item, index) => (
                    <div key={index} className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-4 h-4" />
                      <span>
                        <strong>{item.day}</strong> at {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">Location</h4>
                <div className="text-sm space-y-2">
                  <p className="font-medium">{CLASS_INFO.physical.location}</p>
                  <p className="text-gray-400">{CLASS_INFO.physical.address}</p>
                  <a
                    href={`tel:${CLASS_INFO.physical.phone}`}
                    className="text-gray-400 hover:text-white flex items-center gap-2 mt-2"
                  >
                    <Phone className="w-4 h-4" />
                    {CLASS_INFO.physical.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Classes */}
          <div>
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6" />
              Virtual Classes
            </h3>
            <div className="space-y-6">
              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-2 text-sm">Flexible Learning</h4>
                <p className="text-gray-400 text-sm">
                  Learn at your own pace with recorded sessions and live Q&A support.
                </p>
              </div>

              <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
                <h4 className="font-semibold mb-4 text-sm">Contact Us</h4>
                <div className="space-y-3 text-sm">
                  <a
                    href={`mailto:${CLASS_INFO.contact.email}`}
                    className="text-gray-400 hover:text-white flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {CLASS_INFO.contact.email}
                  </a>
                  <a
                    href={`tel:${CLASS_INFO.physical.phone}`}
                    className="text-gray-400 hover:text-white flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    {CLASS_INFO.physical.phone}
                  </a>
                </div>
              </div>

              <div className="text-xs text-gray-500">
                <p>
                  <strong>Payment:</strong> {PROGRAM_INFO.payment}
                </p>
                <p className="mt-2">
                  <strong>Offer:</strong> {PROGRAM_INFO.discount.text}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}