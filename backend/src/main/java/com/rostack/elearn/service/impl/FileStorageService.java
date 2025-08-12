package com.rostack.elearn.service.impl;

import com.rostack.elearn.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@RequiredArgsConstructor
public class FileStorageService {

    @Value("${upload.path}")
    private String uploadDir;

    private final CourseService courseService;

    public String uploadCourseThumbnailFile(MultipartFile file, Long courseId) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Handle edit case: delete old thumbnail
        if (courseId != null && courseId != -1) {
            String oldThumbnailPath = courseService.getCourseDetails(courseId).getThumbnail();

            if (oldThumbnailPath != null && !oldThumbnailPath.isEmpty()) {
                Path oldFilePath = Paths.get(oldThumbnailPath); // assuming stored path is actual filesystem path
                if (Files.exists(oldFilePath)) {
                    Files.delete(oldFilePath);
                    System.out.println("Deleted old thumbnail: " + oldFilePath);
                }
            }
        }


        String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(filename);

        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

        return uploadPath + "/" + filename; // Public URL to serve the file
    }
}
