<?php

namespace Modules\User\Controllers;
use Modules\Frontend\Controllers\ControllerBase;

class DashboardController extends ControllerBase
{
	public function initialize()
    {
        $this->view->setTemplateBefore('private');
    }

	public function indexAction()
	{
		
	}
}