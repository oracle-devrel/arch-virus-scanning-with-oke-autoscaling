resource "oci_events_rule" "scan_rule" {
  display_name   = var.scanning_rule_display_name
  condition      = var.event_condition
  compartment_id = var.compartment_id
  is_enabled     = true
  description    = "Scanning Object Storage event"
  actions {
    actions {
        is_enabled  = true
        action_type = "FAAS"
        function_id = var.function_id
    }
  }
  freeform_tags = {
    Managed = var.tags
  }
}
