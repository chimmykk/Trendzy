
import React from 'react';
import { Form, Field, ErrorMessage } from 'formik';

export default function Visibility(props: any) {

      const { errors, values } = props;

  return (
    <Form className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <h2 className="text-lg font-semibold mb-4">Visibility</h2>

  <div className="mb-4">
    <Field
      type="radio"
      id="goLiveNow"
      name="visibility"
      value="GoLiveNow"
      className="mr-2"
    />
    <label htmlFor="goLiveNow" className="mr-4">
      GO Live Now
    </label>
  </div>

  <div className="mb-4">
    <Field
      type="radio"
      id="scheduleLater"
      name="visibility"
      value="ScheduleLater"
      className="mr-2"
    />
    <label htmlFor="scheduleLater" className="mr-4">
      Schedule For Later
    </label>
  </div>

  {values.visibility === 'ScheduleLater' && ( // Check the visibility field in values
  <div className="mb-4">
      <label htmlFor="scheduledDate" className="block text-sm font-bold mb-2">
        Select Date:
      </label>
      <Field
        type="date"
        id="scheduledDate"
        name="scheduledDate"
        className="shadow appearance-none bg-bgDark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
      />
      <ErrorMessage name="scheduledDate" component="p" className="text-red-500 text-xs italic" />

      <div className="flex mt-4">
        <div className="w-1/2 pr-2">
          <label htmlFor="scheduledTime" className="block text-sm font-bold mb-2">
            Select Time:
          </label>
          <Field
            type="time"
            id="scheduledTime"
            name="scheduledTime"
            className="shadow appearance-none bg-bgDark rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
          <ErrorMessage name="scheduledTime" component="p" className="text-red-500 text-xs italic" />
        </div>
        {/* You can add more input fields or customize the layout as needed */}
      </div>
    </div>
  )}
</Form>

  );
}
