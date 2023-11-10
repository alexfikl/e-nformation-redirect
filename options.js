document.addEventListener("DOMContentLoaded", () => {
    var status_field;
    var university_box;
    var select_box;
    var select_radio;
    var custom_radio;

    function init_options() {
        status_field = document.getElementById("status");
        university_box = document.getElementById("university_id_box");
        select_box = document.getElementById("university_id_select");
        select_radio = document.getElementById("university_select");
        custom_radio = document.getElementById("university_custom");
        save_button = document.getElementById("save_button");

        select_radio.addEventListener("click", radio_onclick);
        custom_radio.addEventListener("click", radio_onclick);
        select_box.addEventListener("change", select_onchange);
        save_button.addEventListener("click", save_options);

        restore_options();
    }

    function save_options() {
        browser.storage.sync.set({"university_id": university_box.value}, () => {
            // Update status to let user know options were saved.
            status_field.innerHTML = "Options Saved.";
            setTimeout(() => {
                status_field.innerHTML = "";
            }, 2000);
        });
    }

    function restore_options() {
        browser.storage.sync.get({"university_id": null}, (items) => {
            var university_id = items["university_id"];

            if (university_id) {
                university_box.value = university_id;
                select_box.value = university_id;
                if (select_box.value == university_id) {
                    select_radio.checked = true;
                } else {
                    custom_radio.checked = true;
                }
            } else {
                select_radio.checked = true;
                select_box.selectedIndex = 0;
            }
            radio_onclick();
            select_onchange();
        });
    }

    function select_onchange() {
        if (select_radio.checked) {
            university_box.value = select_box.value;
        }
    }

    function radio_onclick() {
        select_box.disabled = !select_radio.checked;
        university_box.disabled = select_radio.checked;
    }

    init_options();
});
