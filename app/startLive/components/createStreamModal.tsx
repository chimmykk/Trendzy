"use client"

import { FormikWizard } from "formik-wizard-form";
import * as Yup from "yup";
import Visibility from "./Visibility";
import Details from "./Details";
import { FaEye, FaInfo } from 'react-icons/fa'
import { FormikProps } from "formik";
import { FormikValues } from "formik";


interface RenderProps extends FormikProps<FormikValues> {
  /** Handler to be called on previous button click */
  handlePrev: () => void;

  /** Handler to be called on next button click */
  handleNext: () => void;

  /** Current step index in number */
  currentStepIndex?: number;

  /** Flag to indicate previous button should be disabled */
  isPrevDisabled: boolean;

  /** Flag to indicate next button should be disabled */
  isNextDisabled: boolean;

  /** Flag to indicate current step is first step */
  isFirstStep: boolean;

  /** Flag to indicate current step is last step */
  isLastStep: boolean;

  /** Current step component renderer */
  renderComponent: () => React.ReactNode;
}



export default function App() {
  return (
    <div className=" relative bg-[#1E1F22] text-white my-[41.4px] h-[480px]  overflow-y-scroll  overflow-x-hidden w-[800px] mx-auto rounded-lg shadow-lg">
      <FormikWizard
        initialValues={{}}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          console.log(values)
            
        }}
        validateOnNext
        activeStepIndex ={0}
        steps={[
          {
            component: Details,
            validationSchema: Yup.object().shape({
                title: Yup.string().required('Title is required'),
              tags: Yup.string(),
              goLiveWith: Yup.string().oneOf(['webcam', 'obs'], 'Invalid option'),
              category: Yup.string().oneOf(['men', 'women'], 'Invalid option'),
              thumbnail: Yup.mixed(),
            }),
          },
          {
            component: Visibility,
            validationSchema: Yup.object().shape({
              visibility: Yup.string()
                .required('Visibility option is required')
                .oneOf(['GoLiveNow', 'ScheduleLater'], 'Invalid visibility option'),
                  scheduledDateTime: Yup.string().when('visibility', {
                is: 'ScheduleLater',
                then: (fieldSchema) =>
                  fieldSchema
                    .required('Scheduled date and time are required when scheduling')
                    .matches(
                      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/,
                      'Scheduled date and time must be in the format YYYY-MM-DDTHH:mm'
                    ),
              }),
              }),
          },
        
        ]}
      >
      {(props) => {
            const {
              currentStepIndex,
              renderComponent,
              handlePrev,
              handleNext,
              isNextDisabled,
              isPrevDisabled,
              isValid,
              isSubmitting,
              values,
            } = props;

            return (
              <>
                <div className=" overflow-y-scroll sticky top-0 bg-[#1E1F22] text-white w-[800px] mx-auto rounded-lg z-50 shadow-lg">
                      <div className={`border-b border-[#444458] py-3 z-10`}>
                          <h1 className="px-6 font-semibold text-xl">Create stream</h1>   
                      </div>   
                          <div className="flex items-center px-40 py-8">
                            <div className={`flex items-center text-bgGreen relative ${currentStepIndex === 0 ? 'font-medium' : ''}`}>
                              <div className={`absolute top-0 -ml-10 text-center -mt-6 w-32 text-xs uppercase ${currentStepIndex === 0 ? 'text-bgGreen' : 'text-white'}`}>Details</div>
                              {currentStepIndex === 0 ? (
                    <div className="rounded-full transition duration-500 ease-in-out h-8 w-8 py-3 border-2 bg-bgGreen border-borderC">
                    </div>
                      ) : (
                        <div className="rounded-full transition duration-500 ease-in-out h-8 w-8 border-2 bg-bgGreen border-borderC flex items-center justify-center">
                          <span className="text-white">&#10003;</span>
                        </div>
                      )}
                      
                    </div>
                    <div className="flex-auto border-t-2 transition duration-500 ease-in-out border-borderC"></div>
                    <div className={`flex items-center text-white relative ${currentStepIndex === 1 ? 'font-medium' : ''}`}>
                      <div className={`absolute top-0 -ml-10 text-center -mt-6 w-32 text-xs uppercase ${currentStepIndex === 1 ? 'text-bgGreen' : 'text-white'}`}>Visibility</div>
                      <div className={`rounded-full transition duration-500 ease-in-out h-8 w-8 border-2 ${currentStepIndex === 1 ? 'bg-bgGreen border-borderC' : 'border-white'}`}>
                      </div>
                    </div>
                  </div>
                </div>
                <div>{renderComponent()}</div>
                <div className=" sticky bottom-0 bg-[#1E1F22]  py-4 border-t border-[#494444] bg flex justify-end gap-8 px-32">
                  <button
                    disabled={isPrevDisabled}
                    onClick={handlePrev}
                  >
                    Back
                  </button>
                  <button
                    disabled={!isValid || isSubmitting}
                    onClick={handleNext}
                    className=""
                  >
                    {currentStepIndex === 1 ? "Finish" : "Next"}
                  </button>
                </div>
                <div>
                  <pre>{JSON.stringify(values, null, 2)}</pre>
                </div>
              </>
            );
          }}
  </FormikWizard>        
    </div>
  );
}
