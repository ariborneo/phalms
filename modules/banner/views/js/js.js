$(document).ready(function(){
    var banner_grid = $("#grid-banner").bootgrid({
        ajax: true,
        url: "banner/list",
        selection: true,
        multiSelect: true,
        templates: {
            header:"<div id=\"{{ctx.id}}\" class=\"{{css.header}}\"><div class=\"row\"><div class=\"col-sm-6 actionBar\"><div class=\"{{css.search}}\"></div></div><div class=\"col-sm-6\"><div class=\"{{css.actions}}\"></div> <div class='btn btn-primary' id='create' class='command-add'> <span class=\"fa fa-plus-square-o\"></span> New Banner</div></div></div></div>",
        },
        formatters: {
            "file" : function (column, row) {
                return "<img src='"+row.file+"' height='75px'>";
            },
            "published": function(column, row)
            {
                if(row.publish == 1){
                    return "Yes";
                }else{
                    return "No";
                }
            },
            "commands": function(column, row)
            {
                return "<button type=\"button\" class=\"btn btn-sm btn-primary command-edit\" data-row-title=\""+row.title+"\" data-row-category=\""+row.category+"\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-pencil\"></span></button> " +
                        "<button type=\"button\" class=\"btn btn-sm btn-primary command-delete\" data-row-id=\"" + row.id + "\"><span class=\"fa fa-trash-o\"></span></button>";
            }
        }
    }).on("loaded.rs.jquery.bootgrid", function()
    {
        $(this).find(".command-edit").off();
        $(this).find(".command-delete").off();
        $(this).find(".command-add").off();

        $(this).find(".command-edit").on("click", function(e)
        {
            myForm('edit',$(this));
            $("#myForm").ajaxForm({
                url: 'banner/edit',
                type: 'post',
                success: function(data) {
                    myAlert(data);
                    $("#grid-banner").bootgrid("reload");
                    setTimeout(function(){
                        $('#myModal').modal('hide')
                    }, 10000);
                }
            });

        }).end().find(".command-delete").on("click", function(e)
        {
            $.get( "banner/delete/"+ $(this).data("row-id"), function( data ) {
                myAlert(data);
                $("#grid-banner").bootgrid("reload");
            });

        });

        $("#create").on("click",function(e)
        {
            myForm('create',e);
            $("#myForm").ajaxForm({
                url: 'banner/create',
                type: 'post',
                success: function(data) {
                    myAlert(data);
                    banner_grid.bootgrid("reload");
                    setTimeout(function(){
                        $('#myBanner').modal('hide');
                    }, 10000);
                }
            });
        });
    });


    function myForm(status,e) {
        $('#myForm')[0].reset();
        if(status == 'edit') {

            $('#myBanner .modal-title').html('Edit Banner '+e.data("row-id"));
            $.getJSON("banner/get/?id=" + e.data("row-id"), function (data) {
                //$('#summernote').text("");
                $('#hidden_id').val(data.id);
                $('#link').val(data.link);
                $('#published').val(data.publish);
                $('#description').val(data.description);
                $('#description1').val(data.description1);
            });
        }else{
            $('#myBanner .modal-title').html('Create New Banner ');
            
        }

        $('#myBanner').modal('show');

    }

    function myAlert(e)
    {
        var mesg= [];
        mesg["alert"] = e.alert;
        mesg["title"] = e.msg;
        mesg["msg"] = "#Banner "+e._id+" "+e.msg;
        notif_show(mesg);
    }

});