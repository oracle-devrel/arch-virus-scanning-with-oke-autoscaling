variable "region" {
  type        = string
  description = "Your region"
}

variable "compartment_id" {
  type        = string
  description = "Your compartment OCID"
}

variable "function_id" {
  type        = string
  description = "Your scanning-writeq function OCID"
}

variable "event_condition" {
  type        = string
  description = "Replace OCID with your Compartment OCID"
  default     = "{\"eventType\":[\"com.oraclecloud.objectstorage.updateobject\",\"com.oraclecloud.objectstorage.createobject\"],\"data\":{\"compartmentId\":[\"OCID\"],\"additionalDetails\":{\"bucketName\":[\"scanning-ms\"]}}}"
}

variable "scanning_rule_display_name" {
  type    = string
  default = "scanning"
}

variable "scanning_queue_display_name" {
  type    = string
  default = "scanning"
}

variable "scanning_bucket_name" {
  type    = string
  default = "scanning-ms"
  description = "NOTE: If you change this you need to also change this for the event_condition bucketName above."
}

variable "scanned_bucket_name" {
  type    = string
  default = "scanned-ms"
}

variable "scanned_alert_bucket_name" {
  type    = string
  default = "scanning-alert-ms"
}

variable "scanning_log_display_name" {
  type        = string
  default     = "scanning"
  description = "Log name for scanning-readq-job"
}

variable "scanning_log_group_display_name" {
  type        = string
  default     = "scanning"
  description = "Log group name for scanning log"
}

variable "tags" {
  type    = string
  default = "created by Terraform"
}
