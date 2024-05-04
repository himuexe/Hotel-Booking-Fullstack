import { FormProvider, useForm } from "react-hook-form";
import HotelDetailsSection from "./DetailsSection";
import TypeSection from "./TypeSections";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

const ManageHotelForm = () => {
    const formMethods =useForm<HotelFormData>();
  return <FormProvider {...formMethods}>
    <form>
        <HotelDetailsSection/>
        <TypeSection/>

    </form>
  </FormProvider>;
};
export default ManageHotelForm;
