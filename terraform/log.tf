resource "oci_logging_log_group" "scanning_log_group" {
    compartment_id = var.compartment_id
    display_name   = var.scanning_log_group_display_name
    description    = "Scanning log group"
    freeform_tags  = {
      Managed = var.tags
    }
}

resource "oci_logging_log" "scanning_log" {
    display_name = var.scanning_log_display_name
    log_group_id = oci_logging_log_group.scanning_log_group.id
    log_type     = "CUSTOM"
    is_enabled   = "true"
    retention_duration = "30"
    freeform_tags      = {
      Managed = var.tags
    }
}
