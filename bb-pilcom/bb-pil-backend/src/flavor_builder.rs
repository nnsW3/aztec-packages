use crate::{file_writer::BBFiles, utils::snake_case};
use handlebars::Handlebars;
use serde_json::json;

pub trait FlavorBuilder {
    #[allow(clippy::too_many_arguments)]
    fn create_flavor_hpp(
        &mut self,
        name: &str,
        relation_file_names: &[String],
        lookups: &[String],
        fixed: &[String],
        witness: &[String],
        witness_without_inverses: &[String],
        all_cols: &[String],
        to_be_shifted: &[String],
        shifted: &[String],
        all_cols_and_shifts: &[String],
    );
}

/// Build the boilerplate for the flavor file
impl FlavorBuilder for BBFiles {
    fn create_flavor_hpp(
        &mut self,
        name: &str,
        relation_file_names: &[String],
        lookups: &[String],
        fixed: &[String],
        witness: &[String],
        witness_without_inverses: &[String],
        all_cols: &[String],
        to_be_shifted: &[String],
        shifted: &[String],
        all_cols_and_shifts: &[String],
    ) {
        let mut handlebars = Handlebars::new();

        let data = &json!({
            "name": name,
            "relation_file_names": relation_file_names,
            "lookups": lookups,
            "fixed": fixed,
            "witness": witness,
            "all_cols": all_cols,
            "to_be_shifted": to_be_shifted,
            "shifted": shifted,
            "all_cols_and_shifts": all_cols_and_shifts,
            "witness_without_inverses": witness_without_inverses,
        });

        handlebars
            .register_template_string(
                "flavor.hpp",
                std::str::from_utf8(include_bytes!("../templates/flavor.hpp.hbs")).unwrap(),
            )
            .unwrap();

        let flavor_hpp = handlebars.render("flavor.hpp", data).unwrap();

        self.write_file(
            &self.flavor,
            &format!("{}_flavor.hpp", snake_case(name)),
            &flavor_hpp,
        );
    }
}
