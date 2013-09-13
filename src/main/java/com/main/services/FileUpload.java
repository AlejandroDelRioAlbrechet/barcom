/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.main.services;

import com.main.database.MysqlDataBase;
import com.main.utils.Constants;
import com.sun.jersey.core.header.FormDataContentDisposition;
import com.sun.jersey.multipart.FormDataParam;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Response;

/**
 *
 * @author AliekhandroDelRio
 */
@Path("/file-upload")
public class FileUpload {

    @POST
    @Path("/user-image/{userId}")
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response uploadUserImage(@FormDataParam("file") InputStream uploadedInputStream,
            @FormDataParam("file") FormDataContentDisposition fileDetail,
            @PathParam("userId") String userId) {
        String fileType = fileDetail.getFileName().substring(fileDetail.getFileName().indexOf("."), fileDetail.getFileName().length());
        String path = Constants.USER_IMAGE_UPLOAD_PATH.substring(0, Constants.USER_IMAGE_UPLOAD_PATH.length() - 1); 
        String uploadedFileLocation = path + File.separator + userId + fileType;

        // save it
        saveToFile(uploadedInputStream, uploadedFileLocation);

        String query = "UPDATE `barcom_users` SET `image_path`='http://185.25.116.185/files/" + userId + fileType + "' WHERE  `id`=" + userId + " LIMIT 1;";
        MysqlDataBase.getInstance().update(query);
        return Response.status(200).entity("http://185.25.116.185/files/" + userId + fileType).build();
    }

    // save uploaded file to new location
    private void saveToFile(InputStream uploadedInputStream,
            String uploadedFileLocation) {

        try {
            int read = 0;
            byte[] bytes = new byte[1024];
            File file = new File(uploadedFileLocation);
            file.createNewFile();
            OutputStream out = new FileOutputStream(file);
            while ((read = uploadedInputStream.read(bytes)) != -1) {
                out.write(bytes, 0, read);
            }
            out.flush();
            out.close();
        } catch (IOException e) {
            Logger.getLogger(FileUpload.class.getName()).log(Level.SEVERE, null, e);
        }

    }
}
