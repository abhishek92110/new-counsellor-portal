import React, { useEffect, useState, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { StudentContext } from '../context/StudentState';

export default function VideoAssignment(props) {
    const { student, batch } = props;
    console.log("props video assignment =",student, batch )
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    let ContextValue = useContext(StudentContext);

    const getTrainerdata = async (batch) => 
    {
        console.log('video get func =',batch)
        const res = await fetch(`http://localhost:8000/getuploadVideoUrl`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Batch": batch
            }
        });
        const data = await res.json();
        console.log("Assignment Data ", data);
        setVideos(data);
    };

    useEffect(() => {
        console.log('video assignment')
        let batchDetail = ContextValue.currentBatch ? ContextValue.currentBatch.Batch : batch

        getTrainerdata(batchDetail);
    }, [ContextValue.currentBatch]);

    const handleClick = (video) => {
        console.log('video url =',video)
        setSelectedVideo(video);
    };

    return (
        <>
            <div className='other-link'>
                <div className='other-link-container'>
                    <h3 className='first-heading'>Video </h3>
                    <table id="datatable" className="table table-striped table-bordered" cellSpacing="0" width="100%">
                        {/* Table header */}
                        <tbody>
                            <tr>
                                <th>No.</th>
                                <th>Title</th>
                                <th>Date</th>
                                <th>View</th>
                            </tr>
                          
                            {videos.map((video, index) => {
                                console.log('video=',video)
                                return(
                                    <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{video.VideoTitle}</td>
                                    <td>{video.date}</td>
                                    <td>
                                        <button
                                            className="btn btn-success text-light"
                                            data-toggle="modal"
                                            data-target={`#myModal-${index}`} 
                                            onClick={() => handleClick(video.videoUrl)}
                                        >
                                            <RemoveRedEyeIcon />
                                        </button>
                                    </td>
                                </tr>
                                )
                             
                                })}
                        </tbody>
                    </table>
                </div>
            </div>

            {videos.map((video, index) => (
                <div key={index} className="modal fade" id={`myModal-${index}`} tabIndex="-1" role="dialog" aria-labelledby={`myModalLabel-${index}`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <iframe
                                    title="Google Meet Recording"
                                    width="800"
                                    height="700"
                                    // src="https://drive.google.com/file/d/1wnjSFthaLTdRyd9YkghVjsVK1diocMDe/preview"
                                    src={videos[index].videoUrl}
                                    frameBorder="0"
                                    allowFullScreen
                                ></iframe>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
