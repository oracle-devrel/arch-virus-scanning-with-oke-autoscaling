resource "oci_objectstorage_bucket" "scanning" {
  compartment_id        = var.compartment_id
  name                  = var.scanning_bucket_name
  namespace             = data.oci_objectstorage_namespace.user_namespace.namespace
  object_events_enabled = true
  freeform_tags = {
    Managed = var.tags
  }
}

resource "oci_objectstorage_bucket" "scanned" {
  compartment_id = var.compartment_id
  name           = var.scanned_bucket_name
  namespace      = data.oci_objectstorage_namespace.user_namespace.namespace
  freeform_tags = {
    Managed = var.tags
  }
}

resource "oci_objectstorage_bucket" "scanning_alert_report" {
  compartment_id = var.compartment_id
  name           = var.scanned_alert_bucket_name
  namespace      = data.oci_objectstorage_namespace.user_namespace.namespace
  freeform_tags = {
    Managed = var.tags
  }
}
