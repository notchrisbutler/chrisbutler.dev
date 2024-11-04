import { Briefcase, GraduationCap } from 'lucide-react';

const Resume = () => {
  return (
    <div className="pt-24 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 animate-fade-in">
        <h1 className="text-4xl font-bold text-gray-800">Chris Butler</h1>
      </div>
      
      <div className="space-y-12 px-4 sm:px-0">
        <section className="animate-slide-up">
          <div className="flex items-center space-x-2 mb-6">
            <Briefcase className="text-primary-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Experience</h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                title: 'Software Engineer I',
                company: 'Babel Street',
                period: '07/2022 - Present',
                description: [
                'Develop and maintain advanced web scrapers using Python and Django framework, implementing anti-bot detection strategies with Playwright, Selenium, and IP masking for large-scale data collection.',
                'Lead data collection projects focused on adversarial nations for US Government clients, utilizing custom scraping frameworks and API integrations for OSINT gathering.',
                'Process and analyze large datasets using Python libraries (Pandas, Numpy) and SQL, delivering comprehensive intelligence reports to commercial and government clients.',
                'Implement scalable data pipelines utilizing AWS S3, Google Cloud Storage, and BigQuery for efficient data processing and storage.',
                'Serve as Subject Matter Expert (SME) for high-volume clients, leading small teams to ensure timely delivery of high-quality intelligence products.',
                ],
              },
              {
                title: 'Mobile Marketing Developer',
                company: 'OGAds, LLC.',
                period: '06/2019 - 12/2021',
                description: [
                  'Built dynamic web applications using PHP, HTML5, and CSS3, integrating with MySQL databases for real-time user tracking and analytics.',
                  'Developed and maintained automated mobile device farms using Python and ADB for large-scale app testing and engagement metrics.',
                  'Implemented responsive mobile-first designs and A/B testing frameworks to optimize conversion rates and user engagement.',
                  'Created custom automation scripts to process and analyze marketing performance data, delivering actionable insights to senior management.',
                ],
              },
              {
                title: 'Plan Room Technician',
                company: 'Yuma SW Contractors Assoc.',
                period: '08/2016 - 12/2017',
                description: [
                  'Designed and implemented secure cloud-based document management system for construction bid documents and technical specifications.',
                  'Developed automated document processing workflows using Python scripts to standardize and organize technical drawings and proposals.',
                  'Maintained database of over 500 active construction projects, creating weekly reports and analytics for member contractors.',
                  'Implemented role-based access control systems to ensure secure document sharing among member organizations.',
                ],
              },
              {
                title: 'Legal Services Specialist',
                company: 'United States Marine Corps',
                period: '03/2014 - 04/2016',
                description: [
                  'Managed and maintained classified information systems, ensuring compliance with DoD security protocols and data handling procedures.',
                  'Developed automated workflows for processing legal documentation, reducing document preparation time by 40%.',
                  'Created and maintained secure databases for case management and legal document tracking.',
                  'Conducted detailed analysis of legal precedents and case law using specialized research software and databases.',
                ],
              },
            ].map((job, index) => (
              <div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="space-y-2 mb-6">
                  <h3 className="text-xl font-semibold text-primary-600">
                    {job.title}
                  </h3>
                  <div className="flex flex-col space-y-1">
                    <span className="text-lg font-medium text-gray-800">{job.company}</span>
                    <span className="text-base text-gray-600">{job.period}</span>
                  </div>
                </div>
                <ul className="list-disc ml-4 space-y-3 text-gray-600">
                  {job.description.map((item, i) => (
                    <li key={i} className="pl-2">
                      <span className="text-sm md:text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-slide-up">
          <div className="flex items-center space-x-2 mb-6">
            <GraduationCap className="text-primary-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary-600">
                  Bachelor of Arts, Computer Science
                </h3>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-gray-800">
                    University of North Carolina at Charlotte
                  </span>
                  <span className="text-gray-600 text-sm">
                    Jan 2018 - Jul 2022
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-primary-600">
                  Associate of Science, Computer Science
                </h3>
                <div className="flex flex-col space-y-1">
                  <span className="font-medium text-gray-800">
                    Arizona Western College
                  </span>
                  <span className="text-gray-600 text-sm">
                    Aug 2016 - Dec 2017
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;