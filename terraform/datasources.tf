data "oci_identity_availability_domains" "this" {
  compartment_id = var.compartment_id
}

data "oci_objectstorage_namespace" "user_namespace" {
  compartment_id = var.compartment_id
}
