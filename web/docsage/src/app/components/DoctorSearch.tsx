'use client';

import { useState } from 'react';
import useTheme from '@/hooks/useTheme';

interface Doctor {
  RegistrationNo: string;
  Name: string;
  FatherName: string;
  Status: string;
}

interface DoctorDetails extends Doctor {
  RegistrationType: string;
  RegistrationDate: string;
  ValidUpto: string;
  Qualifications: Array<{ Qualification: string; University: string; PassingYear: string }>;
}

const DoctorSearch: React.FC = () => {
  const [regNo, setRegNo] = useState<string>('');
  const [results, setResults] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [theme] = useTheme();

  const searchDoctors = async () => {
    setLoading(true);
    setError('');
    setResults([]);

    try {
      const response = await fetch(`/api/getDoctorDetails`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ regNo }),
      });

      const data = await response.json();

      if (response.ok) {
        setResults([data]);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('Error fetching data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor as DoctorDetails);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className={`${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'} p-8 rounded-lg transition-colors duration-300`}>
      <h2 className="text-3xl font-bold mb-4">Search for Doctors Online</h2>

      <div className="flex justify-center items-center mb-6">
        <input
          type="text"
          value={regNo}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Enter Registration Number"
          className={`w-2/3 px-4 py-3 mr-2 ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-700 text-white'} placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300`}
        />
        <button
          onClick={searchDoctors}
          className="w-1/3 px-6 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {results.length > 0 && (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${theme === 'light' ? 'bg-gray-100' : 'bg-gray-700'}`}>
                <th className="p-3 text-sm font-semibold">Registration No</th>
                <th className="p-3 text-sm font-semibold">Name</th>
                <th className="p-3 text-sm font-semibold">Father Name</th>
                <th className="p-3 text-sm font-semibold">Status</th>
                <th className="p-3 text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((doc) => (
                <tr key={doc.RegistrationNo} className={`border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-600'}`}>
                  <td className="p-3 text-sm">{doc.RegistrationNo}</td>
                  <td className="p-3 text-sm">{doc.Name}</td>
                  <td className="p-3 text-sm">{doc.FatherName}</td>
                  <td className="p-3 text-sm">{doc.Status}</td>
                  <td className="p-3 text-sm">
                    <button
                      onClick={() => handleViewDetails(doc)}
                      className="text-blue-500 hover:text-blue-600 transition-colors duration-300"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedDoctor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className={`${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg p-6 max-w-md w-full relative transition-colors duration-300`}>
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &#10005;
            </button>
            <h3 className="text-xl font-bold mb-4">Doctor Details</h3>
            <p><strong>Registration No:</strong> {selectedDoctor.RegistrationNo}</p>
            <p><strong>Name:</strong> {selectedDoctor.Name}</p>
            <p><strong>Father Name:</strong> {selectedDoctor.FatherName}</p>
            <p><strong>Status:</strong> {selectedDoctor.Status}</p>
            <p><strong>Registration Type:</strong> {selectedDoctor.RegistrationType}</p>
            <p><strong>Issue Date:</strong> {selectedDoctor.RegistrationDate}</p>
            <p><strong>License Valid Upto:</strong> {selectedDoctor.ValidUpto}</p>
            {selectedDoctor.Qualifications && (
              <div className="mt-4">
                <h4 className="font-semibold">Qualifications:</h4>
                <ul>
                  {selectedDoctor.Qualifications.map((qual, index) => (
                    <li key={index}>
                      {qual.Qualification}, {qual.University} ({qual.PassingYear})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSearch;
