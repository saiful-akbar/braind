<?php

/**
 * Created by Muhammad Muflih Kholidin
 * https://github.com/mmuflih
 * muflic.24@gmail.com
 **/

namespace App\Context\MenuController;

use App\Context\Reader;

class GetByUserReader implements Reader
{
    private $userId;

    public function __construct($userId)
    {
        $this->userId = $userId;
    }

    public function read()
    {
        try {
            $menus = GetAccessReader::DefaultMenu();
            $access = MenuAccess::get($this->userId);
            $accessItem = $this->populateAccess($access);
            return $this->populate($menus, $accessItem);
        } catch (\Exception $e) {
            return GetAccessReader::DefaultMenu();
        }
    }

    private function populateAccess($access)
    {
        foreach ($access as $key => $acc) {
            if (isset($acc['children'])) {
                foreach ($acc['children'] as $ch) {
                    if (isset($ch['route'])) {
                        $items[$ch['route']] = isset($ch['access']) ? $ch['access'] : false;
                    } else {
                        $items[$ch['route_name']] = $ch['access'];
                    }
                }
            }
            $items[$acc['route_name']] = $acc['access'];
        }
        return $items;
    }

    private function populate($menus, $access)
    {
        $items = [];
        foreach ($menus as $key => $menu) {
            if (isset($menu['children'])) {
                $menu['children'] = $this->populate($menu['children'], $access);
            }
            $menu['access'] = isset($access[$menu['route_name']]) ? $access[$menu['route_name']] : false;
            $items[] = $menu;
        }
        return $items;
    }
}
