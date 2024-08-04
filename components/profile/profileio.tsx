"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IoAdd } from "react-icons/io5";

interface ProfileData {
  _city: string;
  _education: string;
  _email: string;
  _languages: string[];
  _name: string;
  _phone: string;
  _socials: string[];
  _work: string;
}

const ProfileForm: React.FC<ProfileData> = ({
  _city,
  _education,
  _email,
  _languages,
  _name,
  _phone,
  _socials,
  _work,
}) => {
  const [name, setName] = useState(_name);
  const [phone, setPhone] = useState(_phone);
  const [education, setEducation] = useState(_education);
  const [city, setCity] = useState(_city);
  const [work, setWork] = useState(_work);
  const [hobby, setHobby] = useState(""); // No default value from props
  const [socials, setSocials] = useState<string[]>(_socials);
  const [languages, setLanguages] = useState<string[]>(_languages);

  const handleSocialChange = (index: number, value: string) => {
    const newSocials = [...socials];
    newSocials[index] = value;
    setSocials(newSocials);
  };

  const handleLanguageChange = (index: number, value: string) => {
    const newLanguages = [...languages];
    newLanguages[index] = value;
    setLanguages(newLanguages);
  };

  const addSocialInput = () => {
    setSocials([...socials, ""]);
  };

  const addLanguageInput = () => {
    setLanguages([...languages, ""]);
  };

  return (
    <form className="flex flex-col mx-auto p-4 col-span-2 bg-white shadow-md md:w-[450px] lg:w-full w-[300px] rounded-lg space-y-4 lg:space-y-0 lg:gap-4">
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="col-span-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <Input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <Input
            type="tel"
            id="phone"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="col-span-2">
          <label htmlFor="education" className="block text-sm font-medium text-gray-700">
            Where I went to school?
          </label>
          <Input
            type="text"
            id="education"
            name="education"
            value={education}
            onChange={(e) => setEducation(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
            Where I live?
          </label>
          <Input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="col-span-2">
          <label htmlFor="hobby" className="block text-sm font-medium text-gray-700">
            I spend most of my time on
          </label>
          <Input
            type="text"
            id="hobby"
            name="hobby"
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label htmlFor="work" className="block text-sm font-medium text-gray-700">
            Kind of work I do
          </label>
          <Input
            type="text"
            id="work"
            name="work"
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
        </div>
      </div>
      <div className="flex lg:flex-row flex-col gap-10">
        <div className="col-span-2 gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Platforms I am most active on
          </label>
          {socials.map((social, index) => (
            <Input
              key={index}
              type="text"
              value={social}
              onChange={(e) => handleSocialChange(index, e.target.value)}
              className="gap-3 mt-2"
            />
          ))}
          <Button
            type="button"
            onClick={addSocialInput}
            className="mt-3 rounded-full p-[18px] border-2 border-dotted border-gray-400 shadow-md"
          >
            <IoAdd size={20} /> Add
          </Button>
        </div>
        <div className="col-span-2 gap-3">
          <label className="block text-sm font-medium text-gray-700">
            Languages I speak
          </label>
          {languages.map((language, index) => (
            <Input
              key={index}
              type="text"
              value={language}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
              className="gap-3 mt-2"
            />
          ))}
          <Button
            type="button"
            onClick={addLanguageInput}
            className="mt-3 rounded-full p-[18px] border-2 border-dotted border-gray-400 shadow-md"
          >
            <IoAdd size={20} /> Add
          </Button>
        </div>
      </div>
      <div className="col-span-2">
        <Button type="submit" variant="submit">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
