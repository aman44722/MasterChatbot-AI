import React from 'react';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import BookIcon from '@mui/icons-material/Book';
import get_started from '../assets/images/get-started.webp';
import first_client from '../assets/images/clients/first.webp';
import second_client from '../assets/images/clients/forward.webp';
import third_client from '../assets/images/clients/kings.webp';
import four_client from '../assets/images/clients/mahindra.webp';
import five_client from '../assets/images/clients/tata.webp';
import six_client from '../assets/images/clients/gujarat.webp';
import seven_client from '../assets/images/clients/care.webp';
import eight_client from '../assets/images/clients/cinepolis.webp';
import chatgpt_Ai from '../assets/images/chatgpt+ai.webp';
import computer_vision from '../assets/images/image-classification.webp';
import text_speech from '../assets/images/text-speech.webp';
import speech_text from '../assets/images/speech-text.webp';
import document_Understanding from '../assets/images/doc-understanding.webp';



// Icons for Curve Card
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';



const logos = [
  first_client,
  second_client,
  third_client,
  four_client,
  five_client,
  six_client,
  seven_client,
  eight_client
];

const HomePage = () => {
  return (
    <>
      {/* Main */}
      <main className="main">

        {/* Hero Section */}
        <section className="hero background-light-purple">
          <div className='getStarted'>
            <h1>
              Get a head start with <strong>AI-driven{' '}
                Conversational</strong> Experience
            </h1>
            <p>Integrate intelligent solutions into your Applications and Workflow</p>
            <div className="heroButtons">
              <Button className='primaryBtn' endIcon={<PlayCircleIcon />}>  Book Demo </Button>
              <Button className='secondaryBtn' endIcon={<BookIcon />}>  Free Trial </Button>
            </div>
          </div>
          <div className='getStartedImg'>
            <img src={get_started} alt="Hero Visual" />
          </div>

        </section>

        {/* Partners/Logos Section */}
        <section className="section partners-section">
          <div className="partners-wrapper">
            {[...logos, ...logos].map((logo, index) => (
              <div key={index} className="partner-logo">
                <img src={logo} alt={`Partner ${index + 1}`} />
              </div>
            ))}
          </div>
        </section>

        {/* NLP Section */}
        <section className="section background-light-purple">
          <h2 className='headings soft-blue text-center'>Natural Language Processing</h2>
          <p className='text-center paragraph natural-l-para'>Leverage our expertise in Natural Language Processing (NLP) to build an advanced digital assistant that contextually understands human communication and makes better & more informed decisions.</p>
          <div className="cardGrid">
            <div className="card soft-blue-bg">
              <div className="card-icon">
                <MenuBookIcon className='soft-blue' />
              </div>
              <p className='card-heading'>Text Classification</p>
              <p className='card-paragraph'>
                Text classification automatically organizes text into categories using NLP and machine learning. It helps process data faster, improve accuracy, and uncover insights from large volumes of information.
              </p>
            </div>
            <div className="card soft-blue-bg">
              <div className="card-icon">
                <AdminPanelSettingsIcon className='soft-blue' />
              </div>
              <p className='card-heading'>Sentiment Analysis</p>
              <p className='card-paragraph'>
                Sentiment Analysis identifies opinions, emotions, and attitudes in text. It’s used to gauge customer feedback, monitor brand reputation, and understand public sentiment quickly.
              </p>
            </div>
            <div className="card soft-blue-bg">
              <div className="card-icon">
                <AutoStoriesIcon className='soft-blue' />
              </div>
              <p className='card-heading'>Entity Recognition</p>
              <p className='card-paragraph'>
                Named Entity Recognition detects and classifies names, places, dates, and other key terms in text. It enables better search, data extraction, and content organization.
              </p>
            </div>
          </div>
        </section>

        {/* Chatbot Section */}
        <section className="section chatbot">
          <div className='first-section'>
            <h4>Unleash the power of ChatGPT AI bot</h4>
            <h2 className='headings soft-blue'>ChatGPT + SmatBot</h2>
            <p>"Elevate customer interactions and unlock the full potential of AI with our advanced ChatGPT integration services. We offer personalized bot training tailored specifically to your business data, ensuring intelligent, context-aware conversations that drive engagement, efficiency, and growth. From automating support to enhancing sales funnels, our solutions adapt seamlessly to your workflows. Experience faster response times, improved customer satisfaction, and smarter communication at every touchpoint."</p>
          </div>
          <div className='second-section'>
            <img src={chatgpt_Ai} alt="ChatGpt + SmatBot" />
          </div>
        </section>

        {/* Computer Vision Section */}
        <section className="section background-light-purple gap-50">
          <div className='gap-20'>
            <h2 className='headings soft-blue text-center'>Computer Vision</h2>
            <p className='text-center paragraph natural-l-para'>SmatBot can help automate the process of classifying, identifying, and locating objects such as people,  bicycles, and dogs in images or videos with accuracy, speed, and efficiency.</p>
          </div>

          <div className="flex-regular">
            <div className='cv-first-section'>

              <h2 className='headings soft-blue'>Image Classification</h2>
              <p>Image classification is the task of assigning a class label to an input image, based on its visual content</p>
              <p>E.g. - classifying different types of animals, such as rabbits, hamsters, and dogs</p>
            </div>
            <div className='second-section'>
              <img src={computer_vision} alt="Image Classification" />
            </div>
          </div>

          <div className="flex-regular">
            <div className='second-section'>
              <img src={computer_vision} alt="Image Classification" />
            </div>
            <div className='cv-first-section'>
              <h2 className='headings soft-blue'>Object Detection</h2>
              <p>Image classification is the task of assigning a class label to an input image, based on its visual content</p>
              <p>E.g. - classifying different types of animals, such as rabbits, hamsters, and dogs</p>
            </div>

          </div>

        </section>

        {/* Text to Speech Section */}
        <section className="section">
          <div className="speechRow soft-blue-bg">
            <div className="text-to-speech flex-reverse">
              <div className='speech-text gap'>
                <h2 className='headings white'>Text-to-Speech</h2>
                <p className='white'>Translate text to a natural, human sounding voice to enhance customer experience by ensuring information is clearly conveyed.</p>
              </div>
              <div className='speech-img'>
                <img src={text_speech} alt="Text to speech" />
              </div>
            </div>
          </div>
        </section>


        {/* Speech to Text Section */}
        <section className="section">
          <div className="speechRow purple">
            <div className="text-to-speech ">
              <div className='speech-text gap'>
                <h2 className='headings white'>Speech to Text</h2>
                <p className='white'>Translate text to a natural, human sounding voice to enhance customer experience by ensuring information is clearly conveyed.</p>
              </div>
              <div className='speech-img'>
                <img src={speech_text} alt="Speech to text" />
              </div>
            </div>
          </div>
        </section>

        {/* Document Understanding */}
        <section className="section background-light-purple">
          <div className="docRow">
            <img src={document_Understanding} alt="Document Understanding" />
            <div className='gap'>
              <h2 className='headings soft-blue text-center'>Intelligent Document Understanding</h2>
              <p>The extraction of information from documents, such as passports, Aadhaar cards, invoices, and PAN cards, using OCR (Optical Character Recognition) software.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </>
  );
};

export default HomePage;
