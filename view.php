<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
    <head>
        <title></title>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" href="jquery-ui/css/ui-lightness/jquery-ui-1.7.2.custom.css" type="text/css"/>
        <link rel="stylesheet" href="styles.css" type="text/css"/>
        <script type="text/javascript" src="viewerObject.js"></script>
        <script type="text/javascript" src="jquery-ui/js/jquery-1.3.2.min.js"></script>
        <script type="text/javascript" src="jquery-ui/js/jquery-ui-1.7.2.custom.min.js"></script>
    </head>
    <body>
        <script type="text/javascript">
            var view;
        </script>
<form action="view.php" method="post">

<?php 
$doc = "";
if ($_GET["doc"]) {
    $doc = $_GET["doc"];
}
if ($_POST["srcSubm"]) {
	$doc = $_POST["docUrl"];
}
?>

        <div id="plugin">

            <div class="menu">
                <div class="holder">
		<span class="label">URL: </span><input id="srcUrl1" type="text" class="url" name="docUrl" value="<?php echo $doc; ?>"/>
                    <input type="submit" value="Reload" name="srcSubm"/>
                </div>
                <div class="holder">
                    <span class="label">Page: </span><input type="text" class="tb pageTextBox" value="1"/>
                    <input type="button" value="Set" onClick="view.SetPage()" style="margin-left:15px;"/>
                    <input class="bttn-s" type="button" value="<" onClick="view.PrevPage()"/>
                    <input class="bttn-s" type="button" value=">" onClick="view.NextPage()"/>
                </div>
                <div class="holder">
                    <span class="label">Zoom: </span><input type="text" class="tb zoomTextBox" value="100"/>%
                    <input type="button" value="Set" onClick="view.SetZoom()"/>
                    <input class="bttn-s" type="button" value="+" onClick="view.ZoomPlus()"/>
                    <input class="bttn-s" type="button" value="-" onClick="view.ZoomMinus()"/>
                </div>
                <div class="holder">
                    <span class="label">View: </span>
                    <input type="button" value="1:1" onClick="view.ZoomOne2one()"/>
                    <input type="button" value="Width" onClick="view.ZoomWidth()"/>
                    <input type="button" value="Stretch" onClick="view.ZoomStretch()"/>
                    <input type="button" value="Page" onClick="view.ZoomPage()"/>
                </div>
            </div>
            <div id="nojs" style="display:none;color:red;">Interfejs JS nie jest dostępny. Sugerowana reinstalacja pluginu nsdejavu.</div>

            <div class="sliderHor">
                <div id="sliderHor"></div>
            </div>

            <div class="plugin">
                <object id="djvu1" class="djvuPlugin" data="<?php echo $doc; ?>" type="image/vnd.djvu" width="100%" height="580px">
                    <!--param name="page" value="1">
                    <param name="zoom" value="stretch"-->
                    This browser cannot render djvu data.
                </object>
            </div>

        </div>

        <div class="sliderVer">
            <div id="sliderVer"></div>
        </div>

        <script type="text/javascript">
            $(window).load(function() {
                view = new ViewerObject('plugin');
                var pluginOK = view.JSAvailable();
                if (pluginOK == false)
                {
                    $("div.menu *").attr('disabled', 'disabled');
                    $('#nojs').show();
                }
                if (pluginOK){
                    var vs = $('#sliderVer').slider({orientation:'vertical', change:VerSliderChange, value: 100, min:0, max:100});
                    var hs = $('#sliderHor').slider({orientation:'horizontal', change:HorSliderChange, min:0, max:100});
                    view.SetSliders('#sliderVer','#sliderHor');
                } else {
                    var vs = $('#sliderVer').slider({orientation:'vertical', value: 100, min:10, max:90});
                    var hs = $('#sliderHor').slider({orientation:'horizontal', min:10, max:90});
                }
            });

            function HorSliderChange(e,ui) { view.SetHorizontalPosition(ui.value); }
            function VerSliderChange(e,ui) { view.SetVerticalalPosition(ui.value); }
        </script>
</form>
    </body>

</html>
