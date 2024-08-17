package storage

import (
	"context"
	"fmt"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

var Cld *cloudinary.Cloudinary

func SetupCloudinary() {
	cld, err := cloudinary.New()
	if err != nil {
		fmt.Println("Cloudinary Setup Error: ", err.Error())
	}
	cld.Config.URL.Secure = true

	Cld = cld
}

func UploadImage(img string, fileName string) (string, error) {
	ctx := context.Background()
	resp, err := Cld.Upload.Upload(
		ctx,
		img,
		uploader.UploadParams{
			PublicID:       fileName,
			UniqueFilename: api.Bool(false),
			Overwrite:      api.Bool(true),
			Folder:         "octomed",
		})

	if err != nil {
		return "", err
	}

	return resp.URL, err
}
