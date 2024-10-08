// Package docs Code generated by swaggo/swag. DO NOT EDIT
package docs

import "github.com/swaggo/swag"

const docTemplate = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{escape .Description}}",
        "title": "{{.Title}}",
        "termsOfService": "http://swagger.io/terms/",
        "contact": {
            "name": "API Support",
            "url": "http://www.swagger.io/support",
            "email": "support@swagger.io"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/health-conditions": {
            "get": {
                "description": "Return all allergies and health conditions",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "health_conditions"
                ],
                "summary": "Get All condition",
                "responses": {}
            }
        },
        "/health-conditions/create/allergy": {
            "post": {
                "description": "Create Allergy",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "health_conditions"
                ],
                "summary": "Create Allergy",
                "parameters": [
                    {
                        "description": "Create Allergy",
                        "name": "CreateAllergy",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.CreateAllergyPayloady"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/health-conditions/create/health-condition": {
            "post": {
                "description": "Create Health condition",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "health_conditions"
                ],
                "summary": "Create Health condition",
                "parameters": [
                    {
                        "description": "Create Health Condition",
                        "name": "CreateHealthCondition",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.CreateHealthCondition"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/create": {
            "post": {
                "description": "Create a user with email and password provider",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Create a user with email and password",
                "parameters": [
                    {
                        "description": "Create User Request",
                        "name": "CreateUserRequest",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.SignupDTO"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/details": {
            "get": {
                "description": "User Details",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Get User Details",
                "responses": {}
            }
        },
        "/users/details/edit": {
            "put": {
                "description": "Edit User Detail",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Edit User Detail",
                "parameters": [
                    {
                        "description": "Update User",
                        "name": "UpdateUser",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/user.UpdateUser"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/login": {
            "post": {
                "description": "Login",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Login",
                "parameters": [
                    {
                        "description": "Login Request",
                        "name": "LoginPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.LoginRequestPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/onboarding/biodata": {
            "post": {
                "description": "Onboarding for biodata",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Onboarding for biodata",
                "parameters": [
                    {
                        "description": "Biodata",
                        "name": "swagger.BioDataPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.BioDataPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/onboarding/health-information": {
            "post": {
                "description": "Onboarding for health condition",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Onboarding for health condition",
                "parameters": [
                    {
                        "description": "Health Condition",
                        "name": "swagger.HealthConditionPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.HealthConditionPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/onboarding/location": {
            "post": {
                "description": "Onboarding for location",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Onboarding for location",
                "parameters": [
                    {
                        "description": "Location",
                        "name": "swagger.LocationPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/swagger.LocationPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/request-forgot-password": {
            "post": {
                "description": "Request for password reset",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Request for password reset",
                "parameters": [
                    {
                        "description": "Request Reset password",
                        "name": "ForgotPasswordRequestPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/user.ForgotPasswordRequestPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/reset-password": {
            "post": {
                "description": "Password reset",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Password reset",
                "parameters": [
                    {
                        "description": "Reset password",
                        "name": "ResetPasswordPayload",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/user.ResetPasswordPayload"
                        }
                    }
                ],
                "responses": {}
            }
        },
        "/users/skip-onboarding": {
            "post": {
                "description": "Skip onboarding",
                "consumes": [
                    "application/json"
                ],
                "produces": [
                    "application/json"
                ],
                "tags": [
                    "users"
                ],
                "summary": "Skip onboarding",
                "responses": {}
            }
        }
    },
    "definitions": {
        "swagger.BioDataPayload": {
            "type": "object",
            "properties": {
                "avatar": {
                    "type": "string"
                },
                "height": {
                    "type": "integer"
                },
                "height_metric": {
                    "type": "string"
                },
                "weight": {
                    "type": "integer"
                },
                "weight_metric": {
                    "type": "string"
                }
            }
        },
        "swagger.CreateAllergyPayloady": {
            "type": "object",
            "properties": {
                "allergy": {
                    "type": "string"
                }
            }
        },
        "swagger.CreateHealthCondition": {
            "type": "object",
            "properties": {
                "health_condition": {
                    "type": "string"
                }
            }
        },
        "swagger.HealthConditionPayload": {
            "type": "object",
            "properties": {
                "allergies": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "health_conditions": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "remove_allergies": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                },
                "remove_health_conditions": {
                    "type": "array",
                    "items": {
                        "type": "integer"
                    }
                }
            }
        },
        "swagger.LocationPayload": {
            "type": "object",
            "required": [
                "country",
                "name",
                "phone_number",
                "region"
            ],
            "properties": {
                "city": {
                    "type": "string"
                },
                "country": {
                    "type": "string"
                },
                "name": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                },
                "region": {
                    "type": "string"
                },
                "street": {
                    "type": "string"
                }
            }
        },
        "swagger.LoginRequestPayload": {
            "type": "object",
            "required": [
                "email"
            ],
            "properties": {
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                }
            }
        },
        "swagger.SignupDTO": {
            "type": "object",
            "required": [
                "dob",
                "full_name",
                "password",
                "phone_number"
            ],
            "properties": {
                "dob": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                }
            }
        },
        "user.ForgotPasswordRequestPayload": {
            "type": "object",
            "properties": {
                "email": {
                    "type": "string"
                }
            }
        },
        "user.ResetPasswordPayload": {
            "type": "object",
            "required": [
                "password",
                "token",
                "user"
            ],
            "properties": {
                "password": {
                    "type": "string"
                },
                "token": {
                    "type": "string"
                },
                "user": {
                    "type": "integer"
                }
            }
        },
        "user.UpdateUser": {
            "type": "object",
            "required": [
                "dob",
                "full_name",
                "phone_number"
            ],
            "properties": {
                "dob": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "full_name": {
                    "type": "string"
                },
                "phone_number": {
                    "type": "string"
                }
            }
        }
    }
}`

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = &swag.Spec{
	Version:          "1.0",
	Host:             "localhost:4000",
	BasePath:         "/",
	Schemes:          []string{},
	Title:            "OctoMed",
	Description:      "This is the API documentation.",
	InfoInstanceName: "swagger",
	SwaggerTemplate:  docTemplate,
	// LeftDelim:        "{{",
	// RightDelim:       "}}",
}

func init() {
	swag.Register(SwaggerInfo.InstanceName(), SwaggerInfo)
}
