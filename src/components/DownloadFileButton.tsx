import React from 'react'

const DownloadFileButton: React.FC = () => {
    const handleDownload = () => {
      const fileUrl = "src/assets/Sample-Data.xlsx"; // Update with your actual file path
      const link = document.createElement("a");
      link.href = fileUrl;
      link.download = "Sample-Data.xlsx"; // Default file name for download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
        <>
              <button
        onClick={handleDownload}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition w-fit duration-300"
      >
        Download File
      </button>

      Download the sample data and upload for the demo grids.
        </>

    );
  };

export default DownloadFileButton
