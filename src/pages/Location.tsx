import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const location = {
  name: 'ChinaMix',
  address: '728 Main St',
  city: 'Montevallo',
  state: 'AL',
  zip: '35115',
  phone: '(205) 626-8040',
  email: 'info@chinamix.com',
  hours: [
    { day: 'Monday-Friday', open: '10:30 AM', close: '9:00 PM' },
    { day: 'Saturday', open: '11:00 AM', close: '9:00 PM' },
    { day: 'Sunday', open: '12:00 PM', close: '9:00 PM' },
  ],
};

export default function Location() {
  return (
    <div className="pt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Cinzel Decorative', cursive" }}>
          Visit ChinaMix
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Location Info */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <MapPin className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Address</h3>
                <p className="text-gray-600">
                  {location.address}<br />
                  {location.city}, {location.state} {location.zip}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-6 h-6 text-red-600 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2">Hours</h3>
                {location.hours.map((schedule) => (
                  <p key={schedule.day} className="text-gray-600">
                    <span className="font-medium">{schedule.day}:</span><br />
                    {schedule.open} - {schedule.close}
                  </p>
                ))}
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p className="text-gray-600 mb-2">
                  <a 
                    href={`tel:${location.phone}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {location.phone}
                  </a>
                </p>
                <p className="text-gray-600">
                  {/* <a 
                    href={`mailto:${location.email}`}
                    className="hover:text-red-600 transition-colors"
                  >
                    {location.email}
                  </a>*/}
                </p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3334.7476771533584!2d-86.86385772427287!3d33.10422897347012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x888539b97c8b0445%3A0x2b0844d1e0c23c89!2s728%20Main%20St%2C%20Montevallo%2C%20AL%2035115!5e0!3m2!1sen!2sus!4v1709901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Getting Here</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold mb-2">Parking</h3>
            <p className="text-gray-600 mb-4">
              Free parking available in our dedicated lot and along Main Street.
            </p>

            <h3 className="font-semibold mb-2">Location</h3>
            <p className="text-gray-600">
              Conveniently located in downtown Montevallo on Main Street. 
              Easy to find with plenty of nearby parking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}