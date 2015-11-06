function ViewerObject(id)
{
    var parent = $('#'+id);

    this.viewer = $('object.djvuPlugin', parent)[0];

    function JSAvailable()
    {
        if (this.viewer.version)
            return true;
        return false;
    }

    this.JSAvailable = JSAvailable;      

    this.pageTextBox = $('input.pageTextBox', parent);
    this.zoomTextBox = $('input.zoomTextBox', parent);
    this.sliderHor = null;
    this.sliderVer = null;

    function SetSliders(ver, hor)
    {
        this.sliderHor = hor;
        this.sliderVer = ver;
    }

    this.page = 1;
    this.posx = 0;
    this.posy = 0;
    this.zoom = 100;
    this.joinedView = null;

    function SetJoinedView(joinedView)
    {
        this.joinedView = joinedView;
    }

    function SetPage(val)
    {
        if (val == undefined)
            val = parseInt(this.pageTextBox.val());

        if (this.joinedView != null)
            this.joinedView.SetPage(val);

        if (val)
        {
            if (val < 1)
            {
                val = 1;
                this.pageTextBox.val(val);
            }

            this.page = val;
            this.viewer.setdjvuopt('page', this.page);
        }
        this.pageTextBox.val(this.page);
    }

    function NextPage()
    {
        var val = parseInt(this.page);

        if (this.joinedView != null)
            this.joinedView.NextPage();

        this.page = val + 1;
        this.viewer.setdjvuopt('page',this.page);
        this.pageTextBox.val(this.page);
        return false;
    }

    function PrevPage()
    {
        var val = parseInt(this.page);

        if (this.joinedView != null)
            this.joinedView.PrevPage();

        if (val > 1)
        {
            this.page = val - 1;
            this.viewer.setdjvuopt('page',this.page);
        }

        this.pageTextBox.val(this.page);
        return false;
    }

    function ReloadSourceDoc(url)
    {
        if (url)
            this.viewer.setdjvuopt('src', url);
        return false;
    }

    function SetHorizontalPosition(val)
    {
        if (this.joinedView != null)
            this.joinedView.SetHorizontalPosition(val);

        var percent = parseFloat(val) / 100;
        this.posx= percent;
        this.viewer.setdjvuopt('showposition', '' + this.posx + ',' + this.posy);
        $(this.sliderHor).slider('option', 'value', val);

    }

    function SetVerticalalPosition(val)
    {       
        if (this.joinedView != null)
            this.joinedView.SetVerticalalPosition(val);

        var percent = parseFloat(1) - parseFloat(parseFloat(val) / 100);
        this.posy = percent;
        this.viewer.setdjvuopt('showposition', '' + this.posx + ',' + this.posy);
        $(this.sliderVer).slider('option', 'value', val);
    }

    function SetZoom(val)
    {
        if (val == undefined)
            val = parseInt(this.zoomTextBox.val());

        if (this.joinedView != null)
            this.joinedView.SetZoom(val);

        if (val || val == 0)
        {
            if (val < 10 ){
                val = 10;
                this.zoomTextBox.val(val);
            } else if (val > 990 ){
                val = 990;
                this.zoomTextBox.val(val);
            }

            this.zoom = val;
            this.viewer.setdjvuopt('zoom', this.zoom);

        }

        this.zoomTextBox.val(this.zoom);
        return false;
    }

    function ZoomPlus()
    {
        var val = this.zoom;

        if (this.joinedView != null)
            this.joinedView.ZoomPlus();

        if (parseInt(this.zoom) < 980){
            this.zoom = parseInt(val) + 10;
            this.zoomTextBox.val(this.zoom);
            this.viewer.setdjvuopt('zoom', this.zoom);
        }

        return false;
    }

    function ZoomMinus()
    {
        var val = this.zoom;

        if (this.joinedView != null)
            this.joinedView.ZoomMinus();

        if (parseInt(this.zoom) > 10) {
            this.zoom = parseInt(val) - 10;
            this.zoomTextBox.val(this.zoom);
            this.viewer.setdjvuopt('zoom', this.zoom);
        }

        return false;
    }

    function ZoomOne2one()
    {
        if (this.joinedView != null)
            this.joinedView.ZoomOne2one();
        this.viewer.setdjvuopt('zoom', 'one2one');
    }


    function ZoomWidth()
    {
        if (this.joinedView != null)
            this.joinedView.ZoomWidth();
        this.viewer.setdjvuopt('zoom', 'width');
    }

    function ZoomPage()
    {
        if (this.joinedView != null)
            this.joinedView.ZoomPage();
        this.viewer.setdjvuopt('zoom', 'page');
    }


    function ZoomStretch()
    {
        if (this.joinedView != null)
            this.joinedView.ZoomStretch();
        this.viewer.setdjvuopt('zoom', 'stretch');
    }


    if (this.viewer.version) {
        this.viewer.setdjvuopt('scrollbars','no');
        this.viewer.setdjvuopt('mouse','no');
        this.viewer.setdjvuopt('passive','yes');
        this.viewer.setdjvuopt('zoom','100');
    }

    this.SetJoinedView = SetJoinedView;
    this.SetPage = SetPage;
    this.NextPage = NextPage;
    this.PrevPage = PrevPage;
    this.ReloadSourceDoc = ReloadSourceDoc;
    this.SetHorizontalPosition = SetHorizontalPosition;
    this.SetVerticalalPosition = SetVerticalalPosition;
    this.SetZoom = SetZoom;
    this.ZoomPlus = ZoomPlus;
    this.ZoomMinus = ZoomMinus;
    this.SetSliders = SetSliders;
    this.ZoomOne2one = ZoomOne2one;
    this.ZoomWidth = ZoomWidth;
    this.ZoomPage = ZoomPage;
    this.ZoomStretch = ZoomStretch;
}
