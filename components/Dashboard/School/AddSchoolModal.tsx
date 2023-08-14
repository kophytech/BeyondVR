import AddNewButton from '@/components/Button/AddNewButton';
import CustomButton from '@/components/Button/Button';
import ImportButton from '@/components/Button/ImportButton';
import CustomInput from '@/components/Forms/Input';
import Modal from '@/components/Modal/Modal';
import Spinner from '@/components/Spinner/Spinner';
import { useAxios } from '@/contexts/AxiosContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { Option, Select } from '@material-tailwind/react';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { useCountries } from 'use-react-countries';

export default function AddSchoolModal() {
  const { isAddingSchool, toggleAddSchool } = useDashboard();
  const { countries } = useCountries();
  const { useMutationWrapper } = useAxios();
  const [name, setName] = useState('');
  const [country, setCountry] = useState<string | undefined>('');
  const [schoolType, setSchoolType] = useState<string | undefined>('');
  const [manager, setManager] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const queryClient = useQueryClient();

  const {
    isLoading,
    isSuccess,
    mutate: addSchool,
  } = useMutationWrapper({
    url: '/admin/school',
    data: {
      name,
      country,
      type: schoolType,
      manager,
      email,
      address,
    },
    options: {
      onSuccess: () => {
        queryClient.invalidateQueries(['schools']);
      },
    },
  });

  const handlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !country || !schoolType || !manager || !email || !address)
      return;
    addSchool();
  };

  const schoolTypeOptions = [
    { label: 'Primary', value: 'primary' },
    { label: 'Middle School', value: 'middle' },
    { label: 'High School', value: 'high' },
    { label: 'University', value: 'university' },
  ];

  useEffect(() => {
    if (isSuccess) toggleAddSchool();
  }, [isSuccess, toggleAddSchool]);

  return (
    <>
      <AddNewButton onClick={toggleAddSchool} />
      <Modal
        title='Add New School'
        open={isAddingSchool}
        handler={toggleAddSchool}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <div className='flex justify-end'>
              <div className=''>
                <ImportButton onClick={() => {}} />
              </div>
            </div>
            <form className='flex flex-col gap-3 p-5' onSubmit={handlSubmit}>
              <CustomInput
                type='text'
                value={name}
                name={'Name'}
                onchange={(e) => setName(e.target.value)}
              />

              <div>
                <Select
                  label='Country'
                  onChange={(value) => setCountry(value)}
                  value={country}
                  selected={(element) =>
                    element &&
                    React.cloneElement(element, {
                      className:
                        'flex items-center px-0 gap-2 pointer-events-none',
                    })
                  }
                >
                  {countries.map(
                    ({ name, flags }: { name: string; flags: any }) => (
                      <Option
                        key={name}
                        value={name}
                        className='flex items-center gap-2'
                      >
                        <Image
                          src={flags.svg}
                          alt={name}
                          width={20}
                          height={20}
                          className='h-5 w-5 rounded-full object-cover'
                        />
                        {name}
                      </Option>
                    )
                  )}
                </Select>
              </div>

              <div>
                <Select
                  label='Type of school'
                  onChange={(value) => setSchoolType(value)}
                  value={schoolType}
                >
                  {schoolTypeOptions.map((type) => (
                    <Option key={type.label} value={type.value}>
                      {type.label}
                    </Option>
                  ))}
                </Select>
              </div>

              <CustomInput
                type='text'
                value={manager}
                name={'Name of the manager'}
                onchange={(e) => setManager(e.target.value)}
              />

              <CustomInput
                type='email'
                value={email}
                name={'Email'}
                onchange={(e) => setEmail(e.target.value)}
              />

              <CustomInput
                type='text'
                value={address}
                name={'Address'}
                onchange={(e) => setAddress(e.target.value)}
              />

              <div className='px-5'>
                <CustomButton gray type='submit' disabled={isLoading}>
                  Confirm
                </CustomButton>
              </div>
            </form>
          </>
        )}
      </Modal>
    </>
  );
}
